const LOGS_KEY = "gridgxly_logs_v2";
const SESSION_ID_KEY = "gridgxly_session_id";
const LAST_ACTIVE_KEY = "gridgxly_last_active";
const SESSION_TIMEOUT_MS = 20 * 60 * 1000; // 20 min idle → new session

function nowMs() { return Date.now(); }
function readAll() {
try { return JSON.parse(localStorage.getItem(LOGS_KEY) || "[]"); }
catch { return []; }
}
function writeAll(arr) {
try { localStorage.setItem(LOGS_KEY, JSON.stringify(arr)); } catch {}
}

function getOrStartSessionId() {
try {
    const t = nowMs();
    const last = Number(localStorage.getItem(LAST_ACTIVE_KEY) || 0);
    let sid = localStorage.getItem(SESSION_ID_KEY);

    if (!sid || !last || t - last > SESSION_TIMEOUT_MS) {
    sid = "s_" + t + "_" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(SESSION_ID_KEY, sid);

    const entries = readAll();
    entries.push({
        id: t,
        timestamp: new Date(t).toISOString(),
        type: "session_start",
        sessionId: sid,
    });
    writeAll(entries);
    }

    localStorage.setItem(LAST_ACTIVE_KEY, String(t));
    return sid;
} catch {
    return "s_fallback";
}
}

export function appendLogEntry(entry) {
try {
    const t = nowMs();
    const base = {
    id: t,
    timestamp: new Date(t).toISOString(),
    sessionId: getOrStartSessionId(),
    ...entry,
    };
    const entries = readAll();
    entries.push(base);
    writeAll(entries);
} catch (err) {
    console.error("Error appending log entry:", err);
}
}

export function getLogEntries() { return readAll(); }

export function getSessions() {
const entries = readAll();
const map = new Map();
for (const e of entries) {
    const sid = e.sessionId || "no-session";
    if (!map.has(sid)) map.set(sid, { id: sid, createdAt: e.timestamp, entries: [] });
    map.get(sid).entries.push(e);
}
const sessions = Array.from(map.values()).map(s => {
    s.entries.sort((a,b)=>a.id-b.id);
    s.createdAt = s.entries[0]?.timestamp || s.createdAt;
    return s;
}).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
return sessions;
}

export function clearLogs() {
try {
    localStorage.removeItem(LOGS_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    localStorage.removeItem(LAST_ACTIVE_KEY);
} catch {}
}
