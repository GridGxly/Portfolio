import { useEffect, useState } from "react";

function ProtectedPage({ children }) {
const [checked, setChecked] = useState(false);
const [hasAccess, setHasAccess] = useState(false);

const [input, setInput] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);


useEffect(() => {
    async function checkStatus() {
    try {
        const res = await fetch("/api/admin-status");
        if (res.ok) {
        const data = await res.json();
        if (data.ok) {
            setHasAccess(true);
        }
        }
    } catch (err) {
        console.error("admin-status error:", err);
    } finally {
        setChecked(true);
    }
    }

    checkStatus();
}, []);

async function handleSubmit(e) {
    e.preventDefault();
    const pass = input.trim();

    if (!pass) {
    setError("Enter the passphrase.");
    return;
    }

    setLoading(true);
    setError("");

    try {
    const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: pass }),
    });

    if (!res.ok) {
        setError("Incorrect passphrase.");
        return;
    }

    const data = await res.json();
    if (data.ok) {
        setHasAccess(true);
        setInput("");
    } else {
        setError("Incorrect passphrase.");
    }
    } catch (err) {
    console.error("admin-login error:", err);
    setError("Error talking to auth server.");
    } finally {
    setLoading(false);
    }
}


if (!checked) return null;

if (!hasAccess) {
    return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-xl">
        <h1 className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            G.R.I.D.G.X.L.Y
        </h1>
        <p className="mt-2 text-lg font-semibold text-slate-50">
            Restricted access
        </p>
        <p className="mt-1 text-xs text-slate-400">
            Authentication required to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            placeholder="Passphrase"
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
            className="w-full rounded-2xl bg-cyan-500 text-slate-950 text-sm font-medium py-2 hover:bg-cyan-400 disabled:opacity-60"
            >
            {loading ? "Checking…" : "Unlock"}
            </button>
        </form>

        <p className="mt-3 text-[10px] text-slate-500">
            No hints. Either you know it, or you don&apos;t.
        </p>
        </div>
    </main>
    );
}


return <>{children}</>;
}

export default ProtectedPage;
