import { useEffect, useState } from "react";
import { clearLogEntries, getLogEntries } from "../utils/logs";
import { Link } from "react-router-dom";

function LogsPage() {
const [entries, setEntries] = useState([]);

function load() {
    const logs = getLogEntries();
    setEntries([...logs].reverse());
}

useEffect(() => {
    load();
}, []);

function handleClear() {
    const ok = window.confirm("Clear all GRIDGXLY logs in this browser?");
    if (!ok) return;
    clearLogEntries();
    setEntries([]);
}

return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
    <div className="mx-auto max-w-4xl space-y-4">
        <header className="flex items-center justify-between gap-3">
        <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            G.R.I.D.G.X.L.Y • Logs
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-50">
            Voice & system logs
            </h1>
            <p className="mt-1 text-xs text-slate-400">
            Stored only in this browser’s localStorage. Great for debugging your AI assistant.
            </p>
        </div>

        <div className="flex flex-col items-end gap-2">
            <button
            onClick={load}
            className="rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 hover:bg-slate-800"
            >
            Refresh
            </button>
            <button
            onClick={handleClear}
            className="rounded-2xl bg-red-500/90 px-3 py-1.5 text-xs font-medium text-slate-950 hover:bg-red-400"
            >
            Clear logs
            </button>
        </div>
        </header>

        {entries.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
            No log entries yet. Once GRIDGXLY starts logging interactions,
            they’ll appear here.
        </p>
        ) : (
        <ul className="mt-4 space-y-3">
            {entries.map((entry) => (
            <li
                key={entry.id}
                className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-xs"
            >
                <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-cyan-300">
                    {entry.type || "event"}
                </span>
                <span className="text-[10px] text-slate-500">
                    {new Date(entry.timestamp).toLocaleString()}
                </span>
                </div>
                {entry.payload && (
                <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-slate-950/70 px-3 py-2 text-[11px] text-slate-100">
                    {JSON.stringify(entry.payload, null, 2)}
                </pre>
                )}
            </li>
            ))}
        </ul>
        )}

        <div className="pt-4">
        <Link
            to="/adminview"
            className="text-xs text-slate-500 hover:text-slate-300"
        >
            ← Back to admin view
        </Link>
        </div>
    </div>
    </main>
);
}

export default LogsPage;
