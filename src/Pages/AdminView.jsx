    import { useEffect, useState } from "react";
    import { getLogEntries } from "../utils/logs";
    import { Link } from "react-router-dom";

    function AdminView() {
    const [logCount, setLogCount] = useState(0);

useEffect(() => {
    const logs = getLogEntries();
    setLogCount(logs.length);
}, []);

return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
    <div className="mx-auto max-w-4xl space-y-6">
        <header>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            G.R.I.D.G.X.L.Y • Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-50">
            Admin View
        </h1>
        <p className="mt-1 text-sm text-slate-400">
            Private controls and diagnostics for  Ralph.
        </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
            <p className="text-sm font-semibold text-slate-100">
            GRIDGXLY Logs
            </p>
            <p className="mt-1 text-xs text-slate-400">
            Stored locally in this browser. Only visible after admin unlock.
            </p>
            <p className="mt-3 text-3xl font-bold text-cyan-400">
            {logCount}
            <span className="ml-2 text-sm text-slate-400 font-normal">
                entries
            </span>
            </p>
            <Link
            to="/logs"
            className="mt-4 inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
            >
            View detailed logs →
            </Link>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
            <p className="text-sm font-semibold text-slate-100">
            Notes
            </p>
            <p className="mt-1 text-xs text-slate-400">
            You can extend this area later with feature flags, manual
            overrides, or whatever you want for  Ralph mode.
            </p>
        </div>
        </section>

        <div>
        <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-300"
        >
            ← Back to main site
        </Link>
        </div>
    </div>
    </main>
);
}

export default AdminView;
