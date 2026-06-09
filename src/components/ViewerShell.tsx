import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Highlighter,
  Minus,
  Plus,
  Search,
  Share2,
  X,
  Folder,
  FileText,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { LIBRARY, findDoc, FOLDERS } from '../lib/library';
import { PdfPage } from './PdfPage';
import { ChatPanel } from './ChatPanel';

type Props = { initialFile?: string };

export function ViewerShell({ initialFile }: Props) {
  const [params, setParams] = useSearchParams();
  const file = params.get('file') ?? initialFile ?? LIBRARY[0].file;
  const doc = useMemo(() => findDoc(file) ?? LIBRARY[0], [file]);
  const initialPage = parseInt(params.get('page') ?? '1', 10);
  const [page, setPage] = useState<Number_>(initialPage);
  const [zoom, setZoom] = useState(1);
  const [showChat, setShowChat] = useState(true);
  const [search, setSearch] = useState('');
  const scrollerRef = useRef<HTMLDivElement>(null);

  // scroll to page on hash/page change
  useEffect(() => {
    const p = parseInt(params.get('page') ?? '1', 10);
    if (Number.isFinite(p) && p >= 1 && p <= doc.pages) {
      setPage(p);
      requestAnimationFrame(() => {
        const el = scrollerRef.current?.querySelector(`[data-page="${p}"]`) as HTMLElement | null;
        if (el) {
          scrollerRef.current?.scrollTo({
            top: el.offsetTop - 24,
            behavior: 'smooth',
          });
        }
      });
    }
  }, [params, doc.pages]);

  // observe current visible page (one page at a time as user scrolls)
  const onPageVisible = (p: number) => {
    setPage(p);
    const next = new URLSearchParams(params);
    next.set('page', String(p));
    setParams(next, { replace: true });
  };

  const goto = (p: number) => {
    if (p < 1 || p > doc.pages) return;
    const next = new URLSearchParams(params);
    next.set('page', String(p));
    setParams(next);
  };

  const openFile = (newFile: string) => {
    const next = new URLSearchParams();
    next.set('file', newFile);
    next.set('page', '1');
    setParams(next);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return LIBRARY;
    const q = search.toLowerCase();
    return LIBRARY.filter(
      (d) => d.name.toLowerCase().includes(q) || d.folder.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg text-ink">
      {/* top bar */}
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-bg-subtle px-3">
        <a href={import.meta.env.BASE_URL || '/'} className="flex items-center gap-2 text-ink-dim hover:text-ink">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-brand-500/20 text-brand-300">
            <FileText className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold text-ink">PageCite</span>
        </a>
        <span className="mx-2 h-5 w-px bg-border" />
        <Folder className="h-3.5 w-3.5 text-ink-mute" />
        <span className="text-xs text-ink-dim">{doc.folder}</span>
        <span className="text-xs text-ink-mute">/</span>
        <span className="truncate text-xs font-medium text-ink">{doc.name}</span>

        <div className="ml-auto flex items-center gap-1">
          <button className="btn-ghost h-8" title="Share folder">
            <Share2 className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Share</span>
          </button>
          <button className="btn-ghost h-8" title="Download">
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            className="btn-ghost h-8"
            title="Toggle AI panel"
            onClick={() => setShowChat((s) => !s)}
          >
            <Sparkles className="h-3.5 w-3.5" /> <span className="hidden sm:inline">AI</span>
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-bg-subtle md:flex">
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-ink-mute" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search folder…"
                className="w-full rounded-md border border-border bg-bg-elev py-1.5 pl-8 pr-2 text-xs text-ink placeholder:text-ink-mute focus:border-brand-500/60 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {FOLDERS.map((folder) => {
              const docs = filtered.filter((d) => d.folder === folder);
              if (docs.length === 0) return null;
              return (
                <div key={folder} className="mb-3">
                  <div className="mb-1 flex items-center gap-1.5 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
                    <Folder className="h-3 w-3" /> {folder}
                  </div>
                  <ul className="space-y-0.5">
                    {docs.map((d) => {
                      const active = d.file === doc.file;
                      return (
                        <li key={d.id}>
                          <button
                            onClick={() => openFile(d.file)}
                            className={`flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                              active
                                ? 'bg-brand-500/10 text-ink ring-1 ring-brand-500/30'
                                : 'text-ink-dim hover:bg-bg-elev hover:text-ink'
                            }`}
                          >
                            <FileText
                              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                                active ? 'text-brand-300' : 'text-ink-mute'
                              }`}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-medium">{d.name}</div>
                              <div className="text-[10px] text-ink-mute">
                                {d.pages} pages · {d.size}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-2 py-6 text-center text-xs text-ink-mute">No documents match.</div>
            )}
          </div>
        </aside>

        {/* reader */}
        <main className="relative flex min-w-0 flex-1 flex-col">
          {/* page nav bar */}
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-border bg-bg-subtle/60 px-3">
            <div className="flex items-center gap-1">
              <button
                className="btn-ghost h-7 w-7 p-0"
                disabled={page <= 1}
                onClick={() => goto(1)}
                title="First page"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </button>
              <button
                className="btn-ghost h-7 w-7 p-0"
                disabled={page <= 1}
                onClick={() => goto((page as number) - 1)}
                title="Previous"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="mx-1 inline-flex items-center gap-1 text-xs font-mono text-ink-dim">
                <input
                  type="number"
                  min={1}
                  max={doc.pages}
                  value={page as unknown as number}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (Number.isFinite(v)) goto(v);
                  }}
                  className="w-12 rounded border border-border bg-bg-elev px-2 py-0.5 text-center font-mono text-xs text-ink focus:border-brand-500/60 focus:outline-none"
                />
                <span className="text-ink-mute">/ {doc.pages}</span>
              </span>
              <button
                className="btn-ghost h-7 w-7 p-0"
                disabled={page >= doc.pages}
                onClick={() => goto((page as number) + 1)}
                title="Next"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button
                className="btn-ghost h-7 w-7 p-0"
                disabled={page >= doc.pages}
                onClick={() => goto(doc.pages)}
                title="Last page"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="btn-ghost h-7 w-7 p-0"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                title="Zoom out"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="font-mono text-xs text-ink-dim w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                className="btn-ghost h-7 w-7 p-0"
                onClick={() => setZoom((z) => Math.min(1.6, z + 0.1))}
                title="Zoom in"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              <span className="mx-1 h-5 w-px bg-border" />
              <button className="btn-ghost h-7" title="Highlight">
                <Highlighter className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* page list */}
          <div
            ref={scrollerRef}
            className="flex-1 overflow-y-auto bg-gradient-to-b from-bg to-[#0c0e16] py-6"
          >
            <div
              className="space-y-6"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                transition: 'transform 120ms ease',
              }}
            >
              {doc.pages_text.map((p) => (
                <PdfPage key={p.page} doc={doc} page={p.page} onPageVisible={onPageVisible} />
              ))}
            </div>
          </div>

          {/* mobile chat toggle */}
          <button
            onClick={() => setShowChat((s) => !s)}
            className="absolute bottom-4 right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/40 md:hidden"
            aria-label="Toggle AI"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </main>

        {/* chat panel */}
        {showChat && (
          <ChatPanel
            onClose={() => setShowChat(false)}
            onJump={(fileName, pageNum) => {
              const next = new URLSearchParams(params);
              next.set('file', fileName);
              next.set('page', String(pageNum));
              setParams(next);
            }}
          />
        )}
      </div>
    </div>
  );
}

type Number_ = number;
