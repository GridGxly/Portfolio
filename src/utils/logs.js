const KEY = "gridgxly_sessions_v1";

const isBrowser = typeof window !== "undefined";

function safeRead() {
if (!isBrowser) return [];
try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function safeWrite(v) {
if (!isBrowser) return;
try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
}


function migrateOldIfPresent() {
if (!isBrowser) return;
const OLD = "gridgxly_logs_v1";
try {
    const raw = localStorage.getItem(OLD);
    if (!raw) return;
    const items = JSON.parse(raw);
    const now = Date.now();
    const s = { id: String(now), createdAt: now, lastActivity: now, entries: items };
    safeWrite([s]);
    localStorage.removeItem(OLD);
} catch {}
}

function ensureOpenSession() {
migrateOldIfPresent();
const all = safeRead();
const last = all[all.length - 1];
const now = Date.now();
  if (!last || (now - (last.lastActivity || last.createdAt)) > 30 * 60 * 1000) {
    const id = (isBrowser && crypto?.randomUUID?.()) || String(now);
    const s = { id, createdAt: now, lastActivity: now, entries: [] };
    all.push(s);
    safeWrite(all);
    return s;
}
return last;
}

export function appendLogEntry(entry) {
if (!isBrowser) return;
const all = safeRead();
const s = ensureOpenSession();
s.entries.push({ ts: Date.now(), ...entry });
s.lastActivity = Date.now();
safeWrite(all);
}

export function getSessions() {
return safeRead();
}

export function clearLogs() {
if (!isBrowser) return;
try { localStorage.removeItem(KEY); } catch {}
}
