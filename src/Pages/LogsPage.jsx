// src/Pages/LogsPage.jsx
import { useEffect, useState } from "react";
import ProtectedPage from "../components/ProtectedPage";

function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("gridgxly_logs");
      if (raw) {
        const parsed = JSON.parse(raw);
        // newest first
        setLogs(parsed.reverse());
      }
    } catch (e) {
      console.error("log read failed", e);
    }
  }, []);

  return (
    <ProtectedPage pageKey="logs">
      <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-50 px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          G.R.I.D.G.X.L.Y Conversation Logs
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Local-only logs from this browser. Use for debugging and lore.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 max-h-[70vh] overflow-y-auto">
          {logs.length === 0 && (
            <p className="text-sm text-slate-500">
              No logs yet. Talk to GRIDGXLY first.
            </p>
          )}

          <ul className="space-y-3 text-sm">
            {logs.map((entry, idx) => (
              <li
                key={idx}
                className={`rounded-2xl px-3 py-2 ${
                  entry.role === "user"
                    ? "bg-slate-800/80 border border-slate-700"
                    : "bg-cyan-500/10 border border-cyan-500/40"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                  {entry.role === "user" ? "User" : "GRIDGXLY"}
                </p>
                <p className="text-slate-100">{entry.text}</p>
                {entry.ts && (
                  <p className="mt-1 text-[10px] text-slate-500">
                    {new Date(entry.ts).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </ProtectedPage>
  );
}

export default LogsPage;
