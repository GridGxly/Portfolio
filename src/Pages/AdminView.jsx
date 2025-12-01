import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getSessions } from "../utils/logs";

function StatPill({ label, value, hint }) {
return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-3">
    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
        {label}
        </p>
        <p className="mt-1 text-2xl font-semibold text-cyan-300">{value}</p>
        {hint && (
        <p className="mt-1 text-[11px] text-slate-500 leading-snug">{hint}</p>
        )}
    </div>
    );
}

    function SectionCard({ title, subtitle, children, badge }) {
    return (
    <section className="relative flex flex-col rounded-3xl border border-slate-700 bg-slate-900/80 p-4 sm:p-5">
    <header className="mb-3 flex items-start justify-between gap-3">
        <div>
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        {subtitle && (
            <p className="mt-1 text-xs text-slate-400 max-w-md">{subtitle}</p>
        )}
        </div>
        {badge && (
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
            {badge}
        </span>
        )}
        </header>
        {children}
    </section>
    );
}

    function StickyNote({ title, body }) {
    return (
    <div className="relative h-28 w-full max-w-xs rotate-[-1.5deg] rounded-xl bg-amber-100/95 p-3 text-xs text-slate-900 shadow-[0_18px_35px_rgba(15,23,42,.75)] dark:bg-amber-100/95">
    <div className="absolute inset-x-6 top-1 h-[2px] rounded-full bg-amber-200/90" />
    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide">
    {title}
    </p>
    <p className="text-[11px] leading-snug line-clamp-4">{body}</p>
    </div>
    );
}

    function formatServiceStatus(service) {
    if (!service) return "status: unknown";
    if (!service.ok) {
    if (service.error === "NETWORK_ERROR") return "status: network error";
    if (service.status && service.status !== 0) {
    return `status: ${service.status} (error)`;
    }
    return "status: error";
    }
    if (typeof service.ms === "number") {
    return `ok · ${service.ms} ms`;
    }
    return "ok";
}

    function statusBadgeClass(service) {
    if (!service) return "bg-slate-800 text-slate-400";
    if (service.ok) return "bg-emerald-900/50 text-emerald-300";
    return "bg-red-900/40 text-red-300";
}

    function AdminView() {
    const [logStats, setLogStats] = useState({ sessions: 0, entries: 0 });

    const [health, setHealth] = useState({
    status: "idle",
    lastChecked: null,
    services: null,
    error: null,
    });
    const [autoRefresh, setAutoRefresh] = useState(false);

    useEffect(() => {
    const sessions = getSessions();
    const sessionCount = sessions.length;
    const entryCount = sessions.reduce(
    (n, s) => n + (s.entries?.length || 0),
    0
    );
    setLogStats({ sessions: sessionCount, entries: entryCount });
    }, []);

    const runHealthCheck = useCallback(async () => {
    setHealth((prev) => ({
    ...prev,
    status: "loading",
    error: null,
    }));

    try {
    const res = await fetch("/api/admin-health");
    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(
        txt || `Request failed with status ${res.status.toString()}`
        );
        }

        const data = await res.json();
        setHealth({
        status: data.ok ? "ok" : "error",
        lastChecked: data.checkedAt || Date.now(),
        services: data.services || null,
        error: data.ok ? null : data.error || null,
        });
    } catch (err) {
    console.error("admin-health fetch failed:", err);
    setHealth({
        status: "error",
        lastChecked: Date.now(),
        services: null,
        error: err?.message || "Request failed",
    });
    }
    }, []);


    useEffect(() => {
    if (!autoRefresh) return;
    runHealthCheck();
    const id = setInterval(runHealthCheck, 60_000);
    return () => clearInterval(id);
    }, [autoRefresh, runHealthCheck]);

    const plannedWidgets = 8;

    const whiteboardNotes = [
    {
    title: "Portfolio roadmap",
    body: "Refine hero section, ship proper homepage, and polish Projects cards and the skills section",
    },
    {
    title: "Voice assistant",
    body: "Tighten context prompt + logging, add ‘what changed since last visit’ response.",
    },
    {
    title: "Security & logging",
    body: "Wire server-side tracking for admin logins, 404 hotspots, and basic uptime checks.",
    },
    ];

    const voiceService = health.services?.voice;
    const contactService = health.services?.contact;
    const siteLockService = health.services?.siteLock;

    return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
    <div className="mx-auto flex max-w-6xl flex-col gap-7">
        <header className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-400">
            G.R.I.D.G.X.L.Y • Admin
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-50">
                Admin View
            </h1>
            <p className="mt-1 text-sm text-slate-400">
                Private dashboard
            </p>
            </div>
            <Link
            to="/"
            className="text-xs font-medium text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
            >
            ← Back to portfolio
            </Link>
        </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
        <StatPill
            label="Local voice & system sessions"
            value={logStats.sessions}
            hint="Sessions stored in this browser via localStorage."
        />
        <StatPill
            label="Local log entries"
            value={logStats.entries}
            hint="Conversations, events, and debug lines."
        />
        <StatPill
            label="Planned admin widgets"
            value={plannedWidgets}
            hint="Whiteboard, analytics, API health, errors, feedback & more."
        />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <SectionCard
            title="Planning whiteboard"
            subtitle="High-level roadmap for GridGxly.Dev. This stays client-side; plug in a secure backend later if you want shared notes."
            >
            <div className="mt-1 grid gap-4 sm:grid-cols-3">
                {whiteboardNotes.map((n) => (
                <StickyNote key={n.title} title={n.title} body={n.body} />
                ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
                Future idea: make these editable and sync via a private admin
                API or Notion/DB integration.
            </p>
            </SectionCard>
        </div>

        <div className="lg:col-span-1">
            <SectionCard
            title="Traffic snapshot"
            subtitle="Shell for wiring Vercel Analytics or your own endpoint. Right now everything is placeholder to avoid baking any real stats into the bundle."
            >
            <dl className="mt-1 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                <dt className="text-slate-300">Today</dt>
                <dd className="text-slate-500">— views</dd>
                </div>
                <div className="flex items-center justify-between">
                <dt className="text-slate-300">Last 7 days</dt>
                <dd className="text-slate-500">— unique visitors</dd>
                </div>
                <div className="flex items-center justify-between">
                <dt className="text-slate-300">Top referrer</dt>
                <dd className="text-slate-500">—</dd>
                </div>
                </dl>
                <p className="mt-3 text-[11px] text-slate-500">
                Later: call a secure{" "}
                <code className="font-mono">/api/admin/analytics</code>{" "}
                route that only responds when the admin cookie is valid.
                </p>
            </SectionCard>
            </div>


            <SectionCard
            title="API health check"
            subtitle="Ping important backend routes via the /api/admin-health endpoint. Auto-refresh is off by default so it won't spam anything."
            >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                <button
                type="button"
                onClick={runHealthCheck}
                disabled={health.status === "loading"}
                className="rounded-full bg-cyan-500 px-3 py-1.5 font-medium text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
                >
                {health.status === "loading"
                    ? "Checking…"
                    : "Run health check"}
                </button>
                <label className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-slate-700/80">
                <input
                    type="checkbox"
                    className="h-3 w-3 accent-cyan-400"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span>Auto-refresh (60s)</span>
                </label>
                </div>

                <div className="text-[10px] text-slate-500">
                {health.lastChecked
                ? `Last checked: ${new Date(
                health.lastChecked
                    ).toLocaleTimeString()}`
                : "Not checked yet"}
                </div>
            </div>

            <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-900/70 px-3 py-2">
                <span className="text-slate-200">Voice / agent stack</span>
                <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${statusBadgeClass(
                    voiceService
                )}`}
                >
                {formatServiceStatus(voiceService)}
                </span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-900/70 px-3 py-2">
                <span className="text-slate-200">Contact / feedback route</span>
                <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${statusBadgeClass(
                    contactService
                )}`}
                >
                {formatServiceStatus(contactService)}
                </span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-900/70 px-3 py-2">
                <span className="text-slate-200">Site-lock / protection</span>
                <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${statusBadgeClass(
                    siteLockService
                )}`}
                >
                {formatServiceStatus(siteLockService)}
                </span>
                </li>
                </ul>

                {health.error && (
                <p className="mt-3 text-[11px] text-red-400">
                Health check error: {health.error}
                </p>
            )}

                {health.status === "idle" && !health.error && (
                <p className="mt-3 text-[11px] text-slate-500">
                Tip: run this manually when you're changing env vars or backend
                routes. Auto-refresh is optional and can be toggled on/off.
                </p>
            )}
            </SectionCard>

            <SectionCard
            title="404 & error hotspots"
            subtitle="UI shell for tracking where users are getting lost."
            badge="planned"
            >
            <div className="mt-1 rounded-2xl border border-slate-800/80 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-400">
            No error data wired yet. Later I can stream a summarized list of
            recent 404s from a server log store (e.g., Vercel, DB, or a JSON
            file) instead of baking raw paths into client code.
            </div>
            </SectionCard>

            <SectionCard
            title="Visitor feedback"
            subtitle="Slot for feedback collected from your contact form."
            badge="planned"
            >
            <div className="mt-1 space-y-2 text-[11px] text-slate-400">
            <p>
                Right now this card is just a placeholder. Real messages should
                live in a secure store (DB, Notion, etc.) and be fetched via an
                authenticated admin API.
            </p>
            <p className="rounded-2xl border border-slate-800/80 bg-slate-950/70 px-3 py-2">
                Idea: show last 3 feedback summaries here, with a “View all in
                admin” button that opens a private page.
            </p>
            </div>
            </SectionCard>

            <SectionCard
            title="Admin login activity"
            subtitle="Space to summarize successful + failed unlock attempts without exposing raw IPs or sensitive identifiers in the bundle."
            badge="planned"
            >
            <ul className="mt-1 space-y-1 text-xs text-slate-400">
            <li>• Successful logins (last 24h): —</li>
            <li>• Failed attempts (last 24h): —</li>
            <li>• Last successful login: —</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
            will track this server-side (for example in a small database table
            or log file) and only send redacted summary numbers to the client.
            </p>
            </SectionCard>

            <SectionCard
            title="Current projects & logs"
            subtitle="Quick glance at what you’re building and a shortcut into raw logs."
            >
            <div className="mt-1 space-y-2 text-xs">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
                <p className="text-[11px] font-semibold text-slate-200">
                Active focus
                </p>
                <p className="mt-1 text-slate-400">
                Portfolio polish & GRIDGXLY assistant. Keep this short and
                high-level so nothing sensitive ships in the JS.
                </p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
                <div>
                <p className="text-[11px] font-semibold text-slate-200">
                    Voice & system logs
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                    {logStats.entries} entries across {logStats.sessions} local
                    sessions.
                </p>
                </div>
                <Link
                to="/logs"
                className="rounded-full bg-cyan-500 px-3 py-1 text-[11px] font-medium text-slate-950 hover:bg-cyan-400"
                >
                Open logs
                </Link>
            </div>
            </div>
        </SectionCard>
        </div>

        <p className="pt-2 text-[10px] text-slate-500">
        Reminder: this page is intentionally just a UI shell. All sensitive
        data, analytics, and auth checks should live behind server-side admin
        APIs and the existing cookie/passphrase gate. nothing happens here yet
        </p>
        </div>
    </main>
    );
}

export default AdminView;
