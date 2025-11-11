import { useEffect, useState } from "react";

const STORAGE_KEY = "gridgxly_site_unlocked_v1";


const IS_DEV = import.meta.env.DEV;

function SiteLockGate({ children }) {
const [checkedLocal, setCheckedLocal] = useState(false);
const [unlocked, setUnlocked] = useState(false);
const [input, setInput] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);


if (IS_DEV) {
    return <>{children}</>;
}


useEffect(() => {
    try {
    const flag = localStorage.getItem(STORAGE_KEY);
    if (flag === "true") {
        setUnlocked(true);
    }
    } catch (err) {
    console.error("Error reading site lock flag:", err);
    } finally {
    setCheckedLocal(true);
    }
}, []);

async function handleSubmit(e) {
    e.preventDefault();
    const typed = input.trim();

    if (!typed) {
    setError("Enter the access key.");
    return;
    }

    setLoading(true);
    setError("");

    try {
    const res = await fetch("/api/site-lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: typed }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
        try {
        localStorage.setItem(STORAGE_KEY, "true");
        } catch (_) {
        }
        setUnlocked(true);
    } else {
        setError("Access denied.");
    }
    } catch (err) {
    console.error("Site lock request failed:", err);
    setError("Something went wrong. Try again in a moment.");
    } finally {
    setLoading(false);
    }
}


if (!checkedLocal) return null;


if (unlocked) {
    return <>{children}</>;
}


return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.9)]">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
        GridGxly.Dev
        </p>
        <h1 className="mt-2 text-xl font-semibold text-slate-50">
        Access required
        </h1>
        <p className="mt-1 text-xs text-slate-400">
        This build of the portfolio is currently locked.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
            type="password"
            value={input}
            onChange={(e) => {
            setInput(e.target.value);
            setError("");
            }}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            placeholder="Enter access key"
            autoComplete="off"
        />
        {error && (
            <p className="text-xs text-red-400">
            {error}
            </p>
        )}
        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-500 text-slate-950 text-sm font-medium py-2 hover:bg-cyan-400 disabled:opacity-60 disabled:hover:bg-cyan-500 transition"
        >
            {loading ? "Checking…" : "Unlock"}
        </button>
        </form>

        <p className="mt-3 text-[10px] text-slate-500">
        Portfolio is currently still in development...
        </p>
    </div>
    </main>
);
}

export default SiteLockGate;
