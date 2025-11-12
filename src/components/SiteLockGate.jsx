const ENABLED = import.meta.env.VITE_ENABLE_SITE_LOCK === "true";
const DEV_BACKDOOR = import.meta.env.VITE_SITE_LOCK_DEV_BACKDOOR || "";

export default function SiteLockGate({ children }) {
if (!ENABLED) return <>{children}</>;

const accepted = (() => {
    try {
    return localStorage.getItem("gx_site_unlocked") === "1";
    } catch {
    return false;
    }
})();

if (accepted) return <>{children}</>;

async function unlock() {
    const pass = window.prompt("Site is in lock mode. Enter passphrase:");
    if (!pass) return;


    if (import.meta.env.DEV && DEV_BACKDOOR && pass === DEV_BACKDOOR) {
    localStorage.setItem("gx_site_unlocked", "1");
    window.location.reload();
    return;
    }

    alert("Wrong passphrase.");
}

return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 p-8">
    <div className="max-w-sm text-center space-y-4">
        <h1 className="text-2xl font-bold">Site locked</h1>
        <p className="text-sm opacity-80">
        My portfolio is still being worked on, please come back later.
        </p>
        <button
        onClick={unlock}
        className="rounded-xl px-4 py-2 bg-cyan-500/10 ring-1 ring-cyan-400 hover:bg-cyan-500/20"
        >
        Enter passphrase
        </button>
    </div>
    </div>
);
}
