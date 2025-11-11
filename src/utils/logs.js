    const LOGS_KEY = "gridgxly_logs_v1";


    export function appendLogEntry(entry) {
    try {
    const now = new Date();
    const base = {
    id: now.getTime(),
    timestamp: now.toISOString(),
    ...entry,
    };

    const existingRaw = localStorage.getItem(LOGS_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];

    existing.push(base);
    localStorage.setItem(LOGS_KEY, JSON.stringify(existing));
    } catch (err) {
    console.error("Error appending log entry:", err);
    }
    }


    export function getLogEntries() {
    try {
    const raw = localStorage.getItem(LOGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
    } catch (err) {
    console.error("Error reading log entries:", err);
    return [];
    }
}


    export function clearLogEntries() {
    try {
    localStorage.removeItem(LOGS_KEY);
    } catch (err) {
    console.error("Error clearing log entries:", err);
    }
}
