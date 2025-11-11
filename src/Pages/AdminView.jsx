// src/Pages/AdminViewPage.jsx
import ProtectedPage from "../components/ProtectedPage";

function AdminViewPage() {
  return (
    <ProtectedPage pageKey="adminview">
      <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-50 px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Console
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Welcome, Master Ralph. This area is hidden from public navigation.
        </p>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-100">
              Quick stats (placeholder)
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Later you can show visit counts, most asked GRIDGXLY questions, etc.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-100">
              Shortcuts
            </h2>
            <ul className="mt-2 text-sm text-cyan-300 space-y-1">
              <li>/logs – conversation logs viewer</li>
              <li>/adminview – this page</li>
            </ul>
          </div>
        </section>
      </main>
    </ProtectedPage>
  );
}

export default AdminViewPage;
