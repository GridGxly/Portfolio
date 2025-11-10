    import { useState } from "react";

    export default function GridgxlyAssistant() {
    const [input, setInput] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
    e.preventDefault();
    const message = input.trim();
    if (!message) return;

    setLoading(true);
    setError("");
    try {
    const res = await fetch("/api/gridgxly-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (!res.ok) {
    throw new Error(data.error || "Request failed");
    }

    setReply(data.reply || "");
    } catch (err) {
    console.error(err);
    setError("Something went wrong talking to G.R.I.D.G.X.L.Y.");
    } finally {
    setLoading(false);
    }
    }

    return (
    <div className="mt-10 max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
    <h2 className="text-lg font-semibold text-white mb-3">
    Talk to <span className="text-grid-accent-soft">G.R.I.D.G.X.L.Y</span>
    </h2>

    <form onSubmit={handleSubmit} className="flex gap-2">
    <input
    className="flex-1 rounded-xl bg-neutral-800 px-3 py-2 text-sm text-neutral-100 outline-none focus:ring-2 focus:ring-grid-accent-soft"
    placeholder="Ask about Master Ralph, his projects, skills, etc."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    />
    <button
    type="submit"
    disabled={loading}
    className="rounded-xl bg-grid-accent-soft px-4 py-2 text-sm font-medium text-neutral-950 disabled:opacity-60"
    >
    {loading ? "Thinking..." : "Send"}
    </button>
    </form>

    {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

    {reply && !error && (
    <div className="mt-4 rounded-xl bg-neutral-800/80 p-3 text-sm text-neutral-100">
    <span className="font-semibold text-grid-accent-soft">GRIDGXLY: </span>
    {reply}
    </div>
    )}
    </div>
    );
    }
