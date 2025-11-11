import { useEffect, useState } from "react";

const STORAGE_KEY = "gridgxly_admin_ok";


const ADMIN_PASSPHRASE =
import.meta.env.VITE_ADMIN_PASSPHRASE || "1972";

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
const typed = input.trim();

    if (!typed) {
    setError("Enter the passphrase.");
    return;
    }

    if (typed === ADMIN_PASSPHRASE) {

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
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-xl">
        <h1 className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            G.R.I.D.G.X.L.Y
        </h1>
        <p className="mt-2 text-lg font-semibold text-slate-50">
            Admin access required
        </p>
        <p className="mt-1 text-xs text-slate-400">
            This area is for  Ralph only. Enter the passphrase to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            placeholder="Enter passphrase"
            />
            {error && (
            <p className="text-xs text-red-400">
                {error}
            </p>
            )}
            <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 text-slate-950 text-sm font-medium py-2 hover:bg-cyan-400 transition"
            >
            Unlock
            </button>
        </form>

        <p className="mt-3 text-[10px] text-slate-500">
            Hint: Only Master Ralph knows this one.
        </p>
        </div>
    </main>
    );
}


return <>{children}</>;
}

export default ProtectedPage;
