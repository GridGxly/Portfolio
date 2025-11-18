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
            className="px-3 py-1 rounded-lg ring-1 ring-neutral-700/50"
            >
            Refresh
            </button>
            <button
            onClick={() => {
                clearLogs();
                window.location.reload();
            }}
            className="px-3 py-1 rounded-lg ring-1 ring-red-500/50 text-red-300"
            >
            Clear logs
            </button>
        </div>
        </div>

        {sessions.length === 0 && (
        <p className="opacity-70">No logs yet.</p>
        )}


    </div>
    </SiteLockGate>
);
}
