import { useEffect, useRef } from 'react';
import type { Doc } from '../lib/library';

type Props = {
  doc: Doc;
  page: number;
  highlight?: string; // terms to highlight (space-separated, case-insensitive)
  onPageVisible?: (page: number) => void;
};

/**
 * One "PDF page" — rendered as a stylised A4-ish page with the chunk's text.
 * In production this is the <canvas> output of pdfjs; for the demo we use
 * realistic chrome (page number, filename footer, header bar) so the
 * "click a citation → jump to page" affordance looks real.
 */
export function PdfPage({ doc, page, highlight, onPageVisible }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const chunk = doc.pages_text.find((p) => p.page === page) ?? doc.pages_text[0];

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onPageVisible?.(page);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [page, onPageVisible]);

  return (
    <div
      ref={ref}
      data-page={page}
      className="pdf-page relative mx-auto bg-white text-neutral-900 shadow-2xl shadow-black/40"
      style={{
        width: 'min(100%, 720px)',
        aspectRatio: '8.5 / 11',
        padding: '56px 64px',
      }}
    >
      {/* header band */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-neutral-200 px-6 py-2 text-[10px] uppercase tracking-wider text-neutral-500">
        <span className="truncate font-medium">{doc.name}</span>
        <span className="font-mono">Page {page} of {doc.pages}</span>
      </div>

      <div className="mt-6 font-serif text-[15px] leading-[1.7] text-neutral-800">
        <Highlighted text={chunk.text} highlight={highlight} />
      </div>

      {/* footer */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-neutral-200 px-6 py-2 text-[10px] uppercase tracking-wider text-neutral-400">
        <span>{doc.folder}</span>
        <span className="font-mono">— {page} —</span>
      </div>
    </div>
  );
}

function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <p className="whitespace-pre-wrap">{text}</p>;
  const terms = highlight
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
  if (terms.length === 0) return <p className="whitespace-pre-wrap">{text}</p>;
  const pattern = new RegExp(`(${terms.map(escapeRe).join('|')})`, 'ig');
  const parts = text.split(pattern);
  return (
    <p className="whitespace-pre-wrap">
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded bg-brand-300/40 px-0.5 text-neutral-900"
            style={{ boxShadow: '0 0 0 2px rgba(37,99,255,0.45)' }}
          >
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </p>
  );
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
