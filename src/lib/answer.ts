// Synthesizes an answer from retrieved hits using a templated extractor.
// Real product would call the LLM (Gemini/Grok) here; the demo does an
// extractive "compose from top hits" so it's deterministic and the
// citation-to-page contract is provable end-to-end.

import type { Hit } from './search';
import { LIBRARY } from './library';

export type Citation = { file: string; page: number; docName: string };

export type Answer = {
  text: string; // may include [n] markers + html
  citations: Citation[]; // index-aligned
  citedDocs: string[]; // unique doc filenames cited, in order
  relevantCount: number; // number of pages inspected
  filesScanned: number; // number of docs scanned
};

const FILLER_OPENINGS = [
  'Based on the indexed pages across the folder, here is what I found.',
  'I read the relevant pages in the folder. Here is the synthesis.',
  'Pulling from the indexed documents, the answer breaks down as follows.',
];

function pickOpening(seed: number) {
  return FILLER_OPENINGS[seed % FILLER_OPENINGS.length];
}

function extractTopSentences(hits: Hit[], max = 2): { sentence: string; hit: Hit }[] {
  const out: { sentence: string; hit: Hit }[] = [];
  for (const h of hits) {
    const sents = h.chunk.text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 30);
    if (sents.length > 0) {
      out.push({ sentence: sents[0], hit: h });
      if (out.length >= max) break;
    }
  }
  return out;
}

export function composeAnswer(query: string, hits: Hit[]): Answer {
  const top = extractTopSentences(hits, Math.min(hits.length, 4));
  if (top.length === 0) {
    return {
      text:
        "I couldn't find a strong match in the indexed PDFs. Try a more specific query, or check that the folder is fully indexed.",
      citations: [],
      citedDocs: [],
      relevantCount: 0,
      filesScanned: LIBRARY.length,
    };
  }

  const citations: Citation[] = [];
  const citedFiles = new Set<string>();
  const opening = pickOpening(query.length);

  const segments = top.map(({ sentence, hit }, i) => {
    const idx = citations.length;
    citations.push({ file: hit.doc.file, page: hit.chunk.page, docName: hit.doc.name });
    citedFiles.add(hit.doc.file);
    return `<p>${escapeHtml(sentence)} <a class="link-cite" href="/view?file=${encodeURIComponent(hit.doc.file)}#page=${hit.chunk.page}" data-cite-idx="${idx}">${hit.doc.file.replace('.pdf', '')} · p.${hit.chunk.page}</a></p>`;
  });

  const docsAcross = LIBRARY.length;
  const relevantPages = hits.length;
  const docList = Array.from(citedFiles).slice(0, 4).join(', ');

  const text = `${opening}\n\n${segments.join('\n')}\n<p class="text-ink-mute text-xs mt-3">Scanned ${docsAcross} documents, ${relevantPages} page${relevantPages === 1 ? '' : 's'} relevant. Sources: ${docList}.</p>`;

  return {
    text,
    citations,
    citedDocs: Array.from(citedFiles),
    relevantCount: relevantPages,
    filesScanned: docsAcross,
  };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
