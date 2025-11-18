import SiteLockGate from "../components/SiteLockGate";
import { getSessions, clearLogs } from "../utils/logs";

export default function LogsPage() {
const sessions = getSessions().slice().reverse();

    return (
    <SiteLockGate>
    <div className="space-y-6">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Voice & system logs</h1>
        <div className="space-x-2">
            <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 rounded-lg ring-1 ring-neutral-700/50 text-sm"
            >
            Refresh
            </button>
            <button
            onClick={() => {
                clearLogs();
                window.location.reload();
            }}
            className="px-3 py-1 rounded-lg ring-1 ring-red-500/60 text-sm"
            >
            Clear logs
            </button>
        </div>
        </div>

        {sessions.length === 0 && (
        <p className="opacity-70">No logs yet.</p>
        )}

        {sessions.map((s) => (
        <div
            key={s.id}
            className="rounded-2xl p-4 bg-neutral-900/60 ring-1 ring-neutral-700/50 space-y-2"
        >
            <div className="mb-1 text-sm opacity-75">
            Session – {new Date(s.createdAt).toLocaleString()} •{" "}
            {s.entries.length} entries
            </div>
            <div className="space-y-2 max-h-[50vh] overflow-auto text-xs">
            {s.entries.map((e, i) => (
                <pre
                key={i}
                className="rounded-xl bg-neutral-900/80 p-3 overflow-auto"
                >
                {JSON.stringify(e, null, 2)}
                </pre>
            ))}
            </div>
        </div>
        ))}
    </div>
    </SiteLockGate>
);
}
