const KEY = "gridgxly_sessions_v1";

function read() {
try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} }

function ensureOpenSession() {
const all = read();
const last = all[all.length - 1];
const now = Date.now();
  if (!last || (now - (last.lastActivity || last.createdAt)) > 30 * 60 * 1000) {
    const s = { id: crypto.randomUUID?.() || String(now), createdAt: now, lastActivity: now, entries: [] };
    all.push(s);
    write(all);
    return s;
}
return last;
}

export function appendLogEntry(entry) {
const all = read();
const s = ensureOpenSession();
s.entries.push({ ts: Date.now(), ...entry });
s.lastActivity = Date.now();
write(all);
}

export function getSessions() { return read(); }
export function clearLogs() { localStorage.removeItem(KEY); }


(function migrate() {
const OLD = "gridgxly_logs_v1";
try {
    const raw = localStorage.getItem(OLD);
    if (!raw) return;
    const items = JSON.parse(raw);
    const now = Date.now();
    const s = { id: String(now), createdAt: now, lastActivity: now, entries: items };
    write([s]);
    localStorage.removeItem(OLD);
} catch {}
})();
