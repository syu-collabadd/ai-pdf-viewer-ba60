import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, ArrowRight, FileText, Layers, Search } from 'lucide-react';
import { search, type Hit } from '../lib/search';
import { composeAnswer, type Answer } from '../lib/answer';
import { LIBRARY } from '../lib/library';

type Msg = {
  role: 'user' | 'ai';
  text: string; // user text or ai answer.text (may include html)
  answer?: Answer;
  hits?: Hit[];
};

type Props = {
  onClose: () => void;
  onJump: (file: string, page: number) => void;
};

const SEED_QUERIES = [
  'When is fall protection required?',
  'What are the steps for a lockout/tagout?',
  'How do I inspect a harness?',
  'Scaffold guardrail height?',
];

export function ChatPanel({ onClose, onJump }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'ai',
      text:
        "I'm PageCite. I read every page of every PDF in your Google Drive folder, so I can answer with citations that jump to the exact page — not just the file. Ask me anything.",
      answer: {
        text: '',
        citations: [],
        citedDocs: [],
        relevantCount: 0,
        filesScanned: LIBRARY.length,
      },
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [showSources, setShowSources] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  function ask(q: string) {
    if (!q.trim() || busy) return;
    setBusy(true);
    const userMsg: Msg = { role: 'user', text: q };
    // simulate retrieval latency so the streaming dots feel real
    setTimeout(() => {
      const hits = search(q, 6);
      const answer = composeAnswer(q, hits);
      const aiMsg: Msg = { role: 'ai', text: answer.text, answer, hits };
      setMessages((m) => [...m, userMsg, aiMsg]);
      setBusy(false);
    }, 480);
  }

  return (
    <aside className="flex w-full max-w-md shrink-0 flex-col border-l border-border bg-bg-subtle md:w-[400px]">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
        <div className="grid h-6 w-6 place-items-center rounded-md bg-brand-500/20 text-brand-300">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Ask the folder</div>
          <div className="text-[10px] text-ink-mute">
            Indexed · {LIBRARY.length} documents · {LIBRARY.reduce((a, d) => a + d.pages, 0)} pages
          </div>
        </div>
        <button className="btn-ghost h-7 w-7 p-0" onClick={onClose} title="Close">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div ref={scroller} className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="space-y-2">
              {m.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-500 px-3.5 py-2 text-sm text-white shadow-glow">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bg-elev text-brand-300">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="max-w-full flex-1 space-y-2">
                    {m.text && (
                      <div
                        className="rounded-2xl rounded-tl-sm bg-bg-card border border-border px-3.5 py-2.5 text-sm text-ink/90 prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: m.text }}
                        onClick={(e) => {
                          const a = (e.target as HTMLElement).closest('a.link-cite') as HTMLAnchorElement | null;
                          if (a) {
                            e.preventDefault();
                            const url = new URL(a.href, window.location.origin + window.location.pathname);
                            const f = url.searchParams.get('file');
                            const p = parseInt(a.getAttribute('href')?.split('#page=')[1] ?? '1', 10);
                            if (f) onJump(f, p);
                          }
                        }}
                      />
                    )}
                    {m.answer && m.answer.citations.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] text-ink-mute">
                          <FileText className="h-3 w-3" />
                          <span className="font-mono">
                            {m.answer.citations.length} citation{m.answer.citations.length === 1 ? '' : 's'}
                          </span>
                          <span>·</span>
                          <span className="font-mono">{m.answer.filesScanned} files scanned</span>
                          <button
                            onClick={() => setShowSources(showSources === i ? null : i)}
                            className="ml-auto inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] text-ink-dim hover:border-border-strong hover:text-ink"
                          >
                            <Layers className="h-3 w-3" />
                            {showSources === i ? 'Hide sources' : 'Show sources'}
                          </button>
                        </div>
                        {showSources === i && m.hits && (
                          <div className="space-y-1.5">
                            {m.hits.map((h, j) => (
                              <button
                                key={j}
                                onClick={() => onJump(h.doc.file, h.chunk.page)}
                                className="group flex w-full items-start gap-2 rounded-lg border border-border bg-bg-card/60 p-2 text-left hover:border-brand-500/40 hover:bg-bg-elev"
                              >
                                <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded bg-bg-elev text-ink-mute group-hover:text-brand-300">
                                  <FileText className="h-3 w-3" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="truncate font-medium text-ink">
                                      {h.doc.name}
                                    </span>
                                    <span className="ml-auto shrink-0 rounded bg-brand-500/10 px-1.5 py-0.5 font-mono text-[10px] text-brand-200">
                                      p.{h.chunk.page}
                                    </span>
                                  </div>
                                  <div
                                    className="mt-1 line-clamp-2 text-[11px] text-ink-dim"
                                    dangerouslySetInnerHTML={{ __html: h.snippet }}
                                  />
                                </div>
                                <ArrowRight className="mt-1 h-3 w-3 shrink-0 text-ink-mute group-hover:text-brand-300" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {busy && (
            <div className="flex items-start gap-2">
              <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bg-elev text-brand-300">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-border bg-bg-card px-3.5 py-2.5 text-sm">
                <span className="inline-flex items-center gap-1 text-ink-dim">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400 [animation-delay:240ms]" />
                  <span className="ml-1 text-xs text-ink-mute">reading pages…</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border p-3">
        {messages.length === 1 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {SEED_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="rounded-full border border-border bg-bg-elev px-2.5 py-1 text-[11px] text-ink-dim hover:border-brand-500/40 hover:text-ink"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
            setInput('');
          }}
          className="relative"
        >
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-ink-mute" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about fall protection, LOTO, PPE…"
            className="w-full rounded-lg border border-border-strong bg-bg-elev py-2 pl-9 pr-10 text-sm text-ink placeholder:text-ink-mute focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-md bg-brand-500 text-white disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-ink-mute">
          <span>
            Answers cite the exact page. Click a citation to jump.
          </span>
          <span className="kbd">⏎</span>
        </div>
      </div>
    </aside>
  );
}
