import { useEffect, useState } from "react";
import AdminView from "../Pages/AdminView";

export default function ProtectedPage() {
const [loading, setLoading] = useState(true);
const [isAdmin, setIsAdmin] = useState(false);
const [passphrase, setPassphrase] = useState("");
const [error, setError] = useState("");

  // this will check if the admin cookie is alredy set
    useEffect(() => {
    let cancelled = false;

    async function checkStatus() {
    try {
        const res = await fetch("/api/admin-status");
        if (!res.ok) {
        throw new Error("Status check failed");
        }
        const data = await res.json();
        if (!cancelled) {
        setIsAdmin(!!data.ok);
        }
        } catch (err) {
        console.error("admin-status error:", err);
        } finally {
        if (!cancelled) {
        setLoading(false);
        }
        }
    }

        checkStatus();

    return () => {
    cancelled = true;
    };
    }, []);

    async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
    const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passphrase }),
        });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
        setIsAdmin(true);
        setPassphrase("");
    } else {
        setError("Incorrect passphrase. Try again.");
    }
    } catch (err) {
    console.error("admin-login error:", err);
    setError("Something went wrong. Please try again.");
    }
    }


    if (loading) {
    return (
    <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-400">Checking access…</p>
    </section>
    );
    }


    if (!isAdmin) {
    return (
    <section className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-4 px-4">
        <header className="space-y-1 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            GRIDGXLY • Admin
        </p>
            <h1 className="text-2xl font-semibold text-slate-50">
            Admin access only
            </h1>
            <p className="text-sm text-slate-400">
            Enter the secret passphrase to get to AdminView.
        </p>
        </header>

        <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-4"
        >
        <label className="block text-sm text-slate-200">
            Passphrase
            <input
            type="password"
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            autoComplete="off"
            />
            </label>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
            type="submit"
            className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
            Unlock admin view
            </button>
        </form>

        <p className="text-center text-xs text-slate-500">
        This page is not for you. Click "GridGxly.Dev" to get back to the portfolio!
        </p>
    </section>
    );
    }


return <AdminView />;
}
