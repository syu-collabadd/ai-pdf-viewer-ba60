import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import { ViewerShell } from './components/ViewerShell';
import { LIBRARY } from './lib/library';

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg text-ink">
      <div className="text-center">
        <div className="text-6xl font-bold text-ink-dim">404</div>
        <p className="mt-2 text-ink-dim">No page here.</p>
        <a className="btn-primary mt-6" href="/">Back home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/view"
        element={<ViewerShell initialFile={LIBRARY[0].file} />}
      />
      <Route path="/view/*" element={<ViewerShell initialFile={LIBRARY[0].file} />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
