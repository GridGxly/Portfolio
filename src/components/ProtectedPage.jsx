    import { useEffect, useState } from "react";

    const STORAGE_KEY = "gridgxly_admin_ok";
    const ADMIN_PASSPHRASE = "1972";

    function ProtectedPage({ children }) {
    const [hasAccess, setHasAccess] = useState(false);
    const [checkedLocal, setCheckedLocal] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
    try {
    const flag = localStorage.getItem(STORAGE_KEY);
    if (flag === "true") {
    setHasAccess(true);
    }
    } catch (err) {
    console.error("Error reading admin flag:", err);
    } finally {
    setCheckedLocal(true);
    }
    }, []);

    function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === ADMIN_PASSPHRASE) {
    localStorage.setItem(STORAGE_KEY, "true");
    setHasAccess(true);
    setError("");
    } else {
    setError("Incorrect passphrase.");
    }
    }

    if (!checkedLocal) return null;

    if (!hasAccess) {
    return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-50">
    <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-400">
            Restricted
        </p>
        <h1 className="mb-1 text-lg font-semibold">
            G.R.I.D.G.X.L.Y Admin Access
        </h1>
        <p className="mb-4 text-xs text-slate-400">
            This area is for  Ralph only.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
        <input
        type="password"
        value={input}
        onChange={(e) => {
                setInput(e.target.value);
                setError("");
        }}
        placeholder="Enter admin passphrase"
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            {error && (
        <p className="text-xs text-red-400">
                {error}
        </p>
            )}
            <button
        type="submit"
        className="w-full rounded-2xl bg-cyan-500 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
            >
        Unlock
            </button>
    </form>

    <p className="mt-3 text-[10px] text-slate-500">
            Note: front-end lock only. Don’t store real secrets here.
    </p>
        </div>
    </div>
    );
    }

    return <>{children}</>;
}

export default ProtectedPage;

