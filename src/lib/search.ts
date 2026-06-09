// Lightweight lexical retriever (BM25-flavored) over per-page chunks.
// In production, this layer is replaced by the embedding+rerank pipeline
// of the LLM provider (Gemini/Grok) but the cite-to-page contract stays.

import { LIBRARY, type Doc, type PageChunk } from './library';

export type Hit = {
  doc: Doc;
  chunk: PageChunk;
  score: number;
  snippet: string; // highlighted snippet around match terms
};

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'for', 'is', 'are',
  'be', 'by', 'as', 'with', 'this', 'that', 'it', 'its', 'if', 'or', 'from', 'into',
  'when', 'than', 'then', 'so', 'do', 'does', 'did', 'have', 'has', 'had', 'will', 'shall',
  'should', 'must', 'may', 'can', 'all', 'any', 'each', 'every', 'no', 'not', 'i', 'we',
  'you', 'they', 'our', 'your', 'their', 'my', 'me', 'us', 'them', 'he', 'she', 'his',
  'her', 'who', 'what', 'which', 'where', 'how', 'why', 'there', 'here', 'also', 'such',
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\-\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

function buildSnippet(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  let firstIdx = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (firstIdx === -1 || i < firstIdx)) firstIdx = i;
  }
  if (firstIdx === -1) return text.slice(0, 220) + (text.length > 220 ? '…' : '');
  const start = Math.max(0, firstIdx - 60);
  const end = Math.min(text.length, firstIdx + 200);
  const head = start > 0 ? '…' : '';
  const tail = end < text.length ? '…' : '';
  let slice = escapeHtml(head + text.slice(start, end) + tail);
  // highlight terms (on escaped text — match only the escaped form of terms)
  for (const t of terms) {
    const re = new RegExp(`(${escapeRe(escapeHtml(t))})`, 'ig');
    slice = slice.replace(re, '<mark>$1</mark>');
  }
  return slice;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function search(query: string, k = 5): Hit[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  const hits: Hit[] = [];
  for (const doc of LIBRARY) {
    for (const chunk of doc.pages_text) {
      const tokens = tokenize(chunk.text);
      if (tokens.length === 0) continue;
      const tf = new Map<string, number>();
      for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
      let score = 0;
      for (const q of qTokens) {
        const f = tf.get(q) ?? 0;
        if (f > 0) {
          // simple TF with document-frequency penalty
          const df = LIBRARY.reduce(
            (acc, d) => acc + (d.pages_text.some((p) => tokenize(p.text).includes(q)) ? 1 : 0),
            0,
          );
          const idf = Math.log(1 + LIBRARY.length / (df + 1));
          score += (1 + Math.log(f)) * idf;
        }
      }
      // small bonus for query term coverage
      const matched = qTokens.filter((q) => tf.has(q)).length;
      const coverage = matched / qTokens.length;
      score *= 0.5 + coverage;
      if (score > 0) {
        hits.push({
          doc,
          chunk,
          score,
          snippet: buildSnippet(chunk.text, qTokens),
        });
      }
    }
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, k);
}
