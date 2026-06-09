# PageCite — Chat with every PDF, cited to the page

Demo of an AI PDF viewer that solves the real-world problem: when an LLM is
asked about a folder of PDFs, generic tools link to the first page of the
source file — not the page the answer actually came from. PageCite scopes
retrieval to the folder and emits **page-anchored citations** that jump the
viewer to the exact page with the relevant text highlighted.

## Live

Deployed via GitHub Pages: https://&lt;github-login&gt;.github.io/ai-pdf-viewer-ba60/

- `/` — landing page
- `/view` — interactive demo with a 6-document safety-policy library

## Local dev

```
npm install
npm run dev      # http://localhost:5173/ai-pdf-viewer-ba60/
npm run build    # outputs dist/
npm run preview  # serves dist/ locally
```

## How the citation contract works

1. Documents are split into per-page chunks (`src/lib/library.ts`).
2. A lexical retriever (`src/lib/search.ts`) ranks pages by BM25-flavored score.
3. The answer composer (`src/lib/answer.ts`) extracts the top sentences and
   attaches `[file.pdf · p.N]` citation chips.
4. Click a chip → router updates `?file=...&page=N` → viewer auto-scrolls to
   that page and highlights matching terms.

In production, step 2 is replaced by the embedding+rerank pipeline of the LLM
provider (Gemini / OpenAI / Anthropic); step 3 calls the model. The
cite-to-page contract stays the same.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS with custom dark theme + brand blue accent
- react-router-dom (HashRouter-safe; GH Pages serves from `/ai-pdf-viewer-ba60/`)
- lucide-react icons

No fabricated stock photos. All copy and sample content is original.
