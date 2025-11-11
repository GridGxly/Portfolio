    import { useEffect, useState } from "react";

    const PASSWORD = 1972
    import.meta.env.VITE_GRIDGXLY_ADMIN_PASS || "change-this-password";

    function ProtectedPage({ pageKey, children }) {
    const storageKey = `ggxly-auth-${pageKey}`;

    const [authed, setAuthed] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
    if (typeof window !== "undefined") {
    const stored = localStorage.getItem(storageKey);
    if (stored === "true") setAuthed(true);
    }
    }, [storageKey]);

    function handleSubmit(e) {
    e.preventDefault();
    if (input === PASSWORD) {
    setAuthed(true);
    localStorage.setItem(storageKey, "true");
    setError("");
    } else {
    setError("Incorrect access phrase.");
    }
    }

    if (!authed) {
    return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-950 text-slate-100">
    <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
    <p className="text-xs tracking-[0.25em] uppercase text-slate-500">
            Restricted
    </p>
    <h1 className="mt-2 text-lg font-semibold text-slate-50">
            GRIDGXLY secure console
    </h1>
    <p className="mt-1 text-xs text-slate-400">
            Enter the secret passphrase to access <span className="font-mono">{pageKey}</span>.
    </p>

    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
    <input
    type="password"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="••••••••••"
    className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm
    text-slate-100 placeholder:text-slate-500 focus:outline-none
    focus:ring-1 focus:ring-cyan-500/70"
    />
    {error && (
    <p className="text-xs text-rose-400">{error}</p>
    )}
    <button
    type="submit"
    className="w-full rounded-2xl bg-cyan-500 px-3 py-2 text-sm font-medium
    text-slate-950 hover:bg-cyan-400 transition"
    >
        Unlock
    </button>
    </form>

    <p className="mt-3 text-[10px] text-slate-500">
            Hint: only  Ralph should know this.
        </p>
        </div>
    </main>
    );
}


    return <>{children}</>;
}

export default ProtectedPage;
