import { useMemo, useState } from "react";
import SiteLockGate from "../components/SiteLockGate";
import { getSessions, clearLogs } from "../utils/logs";

export default function LogsPage() {
const sessions = getSessions().slice().reverse(); 
const [search, setSearch] = useState("");

    const totalEntries = useMemo(
    () =>
    sessions.reduce(
        (sum, s) => sum + (Array.isArray(s.entries) ? s.entries.length : 0),
        0
    ),
    [sessions]
    );

    const filteredSessions = useMemo(() => {
    if (!search.trim()) return sessions;
    const q = search.toLowerCase();
    return sessions.filter((s) =>
    JSON.stringify(s).toLowerCase().includes(q)
    );
    }, [sessions, search]);

    const handleClear = () => {
    if (
    typeof window !== "undefined" &&
    window.confirm("Clear all logs? This cannot be undone.")
    ) {
    clearLogs();
    window.location.reload();
    }
    };

    const hasLogs = sessions.length > 0;
    const hasFiltered = filteredSessions.length > 0;

    return (
    <SiteLockGate>
    <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
            Voice & system logs
            </h1>
            <p className="text-sm opacity-70">
            Private debug view
            </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-xs opacity-75">
            <span className="inline-flex items-center rounded-full bg-neutral-900/70 px-3 py-1 ring-1 ring-neutral-700/60">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {sessions.length} sessions · {totalEntries} entries
            </span>
            </div>


            <div className="flex items-center gap-2">
            <button
                onClick={() => window.location.reload()}
                className="rounded-lg px-3 py-1 text-sm ring-1 ring-neutral-700/60 transition hover:bg-neutral-800/60"
            >
                Refresh
            </button>
            <button
                onClick={handleClear}
                className="rounded-lg px-3 py-1 text-sm ring-1 ring-red-500/70 text-red-100 transition hover:bg-red-500/10"
            >
                Clear logs
            </button>
            </div>
        </div>
        </div>

        {hasLogs && (
        <div className="flex items-center gap-3">
            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search across sessions (text, path, error, etc.)"
            className="w-full rounded-xl bg-neutral-950/60 px-3 py-2 text-sm ring-1 ring-neutral-700/60 outline-none transition focus:ring-emerald-500/70"
            />
        </div>
        )}


        {!hasLogs && (
        <div className="rounded-2xl border border-dashed border-neutral-700/70 bg-neutral-950/60 px-4 py-10 text-center text-sm opacity-80">
            <div className="mb-2 text-base font-medium">
            No logs yet. Everything is quiet.
            </div>
            <p>
            Once the voice assistant or site starts logging events, sessions
            will show up here.
            </p>
        </div>
        )}

        {hasLogs && !hasFiltered && (
        <div className="rounded-2xl border border-dashed border-neutral-700/70 bg-neutral-950/60 px-4 py-6 text-center text-sm opacity-80">
            <div className="mb-1 font-medium">No logs match your search.</div>
            <p>Try clearing the search box or using a different keyword.</p>
        </div>
        )}


        <div className="space-y-4">
        {filteredSessions.map((s, index) => (
            <SessionCard
            key={s.id ?? index}
            session={s}
            index={index}
            />
        ))}
        </div>
    </div>
    </SiteLockGate>
    );
}

function SessionCard({ session, index }) {
const [expanded, setExpanded] = useState(true);
const [copied, setCopied] = useState(false);

    const createdAt =
    session.createdAt || session.startedAt || session.timestamp;

const entries = Array.isArray(session.entries) ? session.entries : [];

    const handleCopy = async () => {
    try {
    await navigator.clipboard.writeText(
        JSON.stringify(session, null, 2)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    } catch (err) {
    console.error("Failed to copy session JSON:", err);
    }
    };

    return (
    <div className="space-y-2 rounded-2xl bg-neutral-950/70 p-4 ring-1 ring-neutral-800/70">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-medium text-neutral-300 ring-1 ring-neutral-700/70">
            #{index + 1}
            </span>
            <span className="font-medium">
            Session –{" "}
            {createdAt
                ? new Date(createdAt).toLocaleString()
                : "timestamp unknown"}
            </span>
        </div>
        <div className="text-xs opacity-70">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
        <button
            onClick={handleCopy}
            className="rounded-lg px-2.5 py-1 ring-1 ring-neutral-700/70 transition hover:bg-neutral-900"
        >
            {copied ? "Copied" : "Copy JSON"}
        </button>
        <button
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-lg px-2.5 py-1 ring-1 ring-neutral-700/70 transition hover:bg-neutral-900"
        >
            {expanded ? "Collapse" : "Expand"}
        </button>
        </div>
    </div>

    {expanded && (
        <div className="space-y-2 max-h-[50vh] overflow-auto text-xs">
        {entries.map((entry, i) => {
            const level =
            entry.level ||
            entry.type ||
            entry.kind ||
            (entry.error ? "error" : "info");

            const ts =
            entry.timestamp ||
            entry.at ||
            entry.time ||
            null;

            const message =
            entry.message ||
            entry.error ||
            entry.text ||
            null;

            return (
            <div
                key={i}
                className="rounded-xl bg-neutral-900/80 p-3 ring-1 ring-neutral-800/80"
            >

                <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px]">
                {level && (
                    <span className="inline-flex items-center rounded-full bg-neutral-950/80 px-2 py-0.5 uppercase tracking-wide text-[10px] ring-1 ring-neutral-700/70">
                    {String(level)}
                    </span>
                )}
                {ts && (
                    <span className="opacity-70">
                    {new Date(ts).toLocaleTimeString()}
                    </span>
                )}
                </div>


                {message && (
                <div className="mb-2 text-[11px] leading-snug">
                    {String(message)}
                </div>
                )}


                <pre className="overflow-auto rounded-lg bg-neutral-950/80 p-2 text-[11px] leading-snug">
                {JSON.stringify(entry, null, 2)}
                </pre>
            </div>
            );
        })}

            {entries.length === 0 && (
            <div className="rounded-xl bg-neutral-900/70 p-3 text-xs opacity-70">
            Session has no entries.
            </div>
            )}
        </div>
    )}
    </div>
    );
}
