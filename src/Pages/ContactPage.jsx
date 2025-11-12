export default function ContactPage() {
return (
    <section id="contact" className="mx-auto max-w-3xl space-y-6 py-12">
    <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">GridGxly.Dev</p>
        <h1 className="text-3xl font-semibold text-white">Get In Touch With Me!</h1>
        <p className="text-slate-300">I will respond maximuin 24 hours</p>
    </header>

    <div className="grid gap-4 sm:grid-cols-2">
        <a
        href="mailto:noelralph2006@gmail.com?subject=Hello%20from%20GridGxly.Dev"
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:bg-slate-900"
        >
        <h2 className="font-medium text-white">Email</h2>
        <p className="text-sm text-slate-300">noelralph2006@gmail.com</p>
        </a>

        <a
        href="https://www.linkedin.com/in/ralphnoel/"
        target="_blank" rel="noreferrer"
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:bg-slate-900"
        >
        <h2 className="font-medium text-white">LinkedIn</h2>
        <p className="text-sm text-slate-300">@ralphnoel</p>
        </a>

        <a
        href="/Ralph-Resume.pdf"
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:bg-slate-900"
        >
        <h2 className="font-medium text-white">Résumé</h2>
        <p className="text-sm text-slate-300">Download the latest PDF</p>
        </a>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <h2 className="font-medium text-white">Other</h2>
        <p className="text-sm text-slate-300">Happy to connect on Discord too: <span className="font-mono">GridGxly</span></p>
        </div>
    </div>
    </section>
);
}
