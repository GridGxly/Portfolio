const KEY = "gridgxly_admin_notes_v1";

const DEFAULT_NOTES = {
    now: [
    { id: "n-1", text: "Polish hero section copy", createdAt: Date.now() },
    { id: "n-2", text: "Tweak navbar hover focus styles", createdAt: Date.now() }
    ],
    next: [
    { id: "n-3", text: "Add projects filtering / tags", createdAt: Date.now() }
    ],
    later: [
    { id: "n-4", text: "Wire server-side admin analytics API", createdAt: Date.now() }
    ]
};

    function safeRead() {
    if (typeof window === "undefined") return DEFAULT_NOTES;
    try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_NOTES;
    const parsed = JSON.parse(raw);
    return {
    now: parsed.now || [],
    next: parsed.next || [],
    later: parsed.later || [],
    };
    } catch {
    return DEFAULT_NOTES;
    }
}

    function safeWrite(value) {
    if (typeof window === "undefined") return;
    try {
    localStorage.setItem(KEY, JSON.stringify(value));
    } catch {
    }
}

    export function loadAdminNotes() {
    return safeRead();
}

    export function saveAdminNotes(notes) {
    safeWrite(notes);
}
