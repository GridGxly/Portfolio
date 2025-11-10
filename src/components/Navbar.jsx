    import { useState } from "react";
    const navLinks = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#features", label: "Features" },
    ];

    export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-500/30 bg-[oklch(42.4%_0.199_265.638)]/90 backdrop-blur">
    <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">

    <a href="#top" className="text-lg font-semibold tracking-tight">
    <span className="font-bold">gridgxly</span>
    <span className="text-blue-200">.dev</span>
    </a>


    <div className="hidden gap-8 text-sm font-medium text-blue-50 sm:flex">
    {navLinks.map((link) => (
    <a
    key={link.href}
    href={link.href}
    className="hover:text-white transition-colors"
    >
    {link.label}
    </a>
    ))}
    </div>


        <div className="hidden items-center gap-3 sm:flex">
        <a
            href="https://github.com/GridGxly"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-blue-50 hover:bg-white/10 transition"
        >
        GitHub
        </a>
        <a
            href="https://www.linkedin.com/in/ralphnoel/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-blue-50 hover:bg-white/10 transition"
        >
            LinkedIn
        </a>
        <a
            href="/Ralph-Resume.pdf"
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-50 hover:bg-white/20 transition"
        >
            Résumé
        </a>
        </div>

        <button
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-blue-50 sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        >

        <span className="block h-0.5 w-5 bg-current transition-transform" />
        <span className="mt-1 block h-0.5 w-5 bg-current transition-transform" />
        <span className="mt-1 block h-0.5 w-5 bg-current transition-transform" />
        </button>
        </nav>


        {isOpen && (
        <div className="sm:hidden border-t border-blue-500/30 bg-[oklch(42.4%_0.199_265.638)]/95">
        <div className="space-y-1 px-4 pb-4 pt-2 text-sm text-blue-50">
        {navLinks.map((link) => (
        <a
        key={link.href}
        href={link.href}
        className="block rounded-md px-2 py-1 hover:bg-white/10"
        onClick={() => setIsOpen(false)}
        >
        {link.label}
        </a>
        ))}

        <div className="mt-2 flex gap-2">
        <a
        href="https://github.com/GridGxly"
        target="_blank"
        rel="noreferrer"
        className="flex-1 rounded-md border border-white/20 px-2 py-1 text-center text-xs hover:bg-white/10"
        >
                GitHub
        </a>
        <a
        href="https://www.linkedin.com/in/ralphnoel/"
        target="_blank"
        rel="noreferrer"
        className="flex-1 rounded-md border border-white/20 px-2 py-1 text-center text-xs hover:bg-white/10"
        >
        LinkedIn
        </a>
        <a
        href="/Ralph-Resume.pdf"
        className="flex-1 rounded-md bg-white/10 px-2 py-1 text-center text-xs hover:bg-white/20"
        >
        Résumé
        </a>
        </div>
        </div>
        </div>
        )}
    </header>
);
}

