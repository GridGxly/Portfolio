    import { useState } from "react";
    import { useNavigate } from "react-router-dom";

    export default function GridgxlyAssistant() {
    const [input, setInput] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
    const res = await fetch("/api/gridgxly-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
    });

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    const rawReply = data.reply || "GRIDGXLY didn't send a reply.";


    const lower = rawReply.toLowerCase();

    if (lower.includes("[go_projects]".toLowerCase())) {
    navigate("/projects");
    } else if (lower.includes("[go_experience]".toLowerCase())) {
    navigate("/experience");
    } else if (lower.includes("[go_skills]".toLowerCase())) {
    navigate("/skills");
    } else if (lower.includes("[go_contact]".toLowerCase())) {
        navigate("/contact");
    }

    const cleanedReply = rawReply
    .replace(/\[GO_PROJECTS\]/i, "")
    .replace(/\[GO_EXPERIENCE\]/i, "")
    .replace(/\[GO_SKILLS\]/i, "")
    .replace(/\[GO_CONTACT\]/i, "")
    .trim();

    setReply(cleanedReply);
    } catch (err) {
    console.error("GRIDGXLY frontend error:", err);
    setError("Something went wrong talking to GRIDGXLY.");
    } finally {
    setLoading(false);
    }
    }

    return (
    <div className="fixed bottom-4 right-4 z-50">
    <div className="bg-slate-900/95 border border-slate-700 rounded-2xl shadow-xl p-4 w-80 text-slate-100">
    <h2 className="text-sm font-semibold mb-2">
        G.R.I.D.G.X.L.Y
    </h2>

    <form onSubmit={handleSubmit} className="space-y-2">
    <input
    type="text"
    className="w-full rounded-xl bg-slate-800 px-3 py-2 text-sm outline-none border border-slate-700 focus:border-blue-500 transition"
    placeholder="Ask me something about Ralph or this site..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    />

    <button
    type="submit"
    disabled={loading}
    className="w-full rounded-xl bg-blue-600 disabled:bg-blue-900 disabled:cursor-not-allowed px-3 py-2 text-sm font-medium hover:bg-blue-500 transition"
    >
    {loading ? "Talking to GRIDGXLY..." : "Ask GRIDGXLY"}
    </button>
    </form>

    {error && (
    <p className="mt-2 text-xs text-red-400">
    {error}
    </p>
    )}

    {reply && !error && (
    <div className="mt-3 text-xs bg-slate-800/80 rounded-xl p-2 border border-slate-700">
    <span className="font-semibold text-blue-300">GRIDGXLY: </span>
    {reply}
    </div>
    )}
    </div>
    </div>
    );
}
