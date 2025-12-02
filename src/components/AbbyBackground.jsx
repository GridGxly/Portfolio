export default function AbbyBackground() {
    return (
    <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]"
    >
    
    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-900/70 via-transparent to-transparent" />


    <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
    <div className="absolute -right-10 bottom-6 h-44 w-44 rounded-full bg-cyan-400/35 blur-2xl" />
    <div className="absolute -right-4 bottom-10 h-24 w-24 rounded-full border border-cyan-300/60" />
    <div className="absolute -right-1 bottom-12 h-6 w-6 rounded-full bg-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.9)]" />
    </div>
    );
}
