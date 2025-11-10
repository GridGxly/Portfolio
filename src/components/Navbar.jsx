    import { useState } from "react";
    import { Link } from "react-router-dom";

    const navLinks = [
    { to: "/experience", label: "Experience" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    ];

    function IconGitHub({ className }) {
    return (
    <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    >
    <path
    fillRule="evenodd"
    d="M12 .5C5.649.5.5 5.65.5 12.004c0 5.095 3.292 9.407 7.865 10.934.575.11.786-.25.786-.556
    0-.274-.01-1-.015-1.962-3.2.695-3.878-1.542-3.878-1.542-.523-1.328-1.278-1.681-1.278-1.681-1.044-.714.079-.7.079-.7
    1.155.081 1.763 1.187 1.763 1.187 1.027 1.76 2.694 1.252 3.35.957.104-.745.402-1.253.73-1.54-2.553-.29-5.236-1.278-5.236-5.69
    0-1.257.448-2.286 1.184-3.09-.119-.29-.513-1.457.112-3.04 0 0 .966-.31 3.166 1.18a10.91 10.91 0 0 1 2.884-.389
    c.978.004 1.964.132 2.884.389 2.198-1.49 3.163-1.18 3.163-1.18.627 1.583.233 2.75.115 3.04.737.804 1.183 1.833 1.183 3.09
    0 4.424-2.688 5.396-5.253 5.681.414.357.78 1.062.78 2.142 0 1.545-.014 2.787-.014 3.167 0 .309.208.671.792.556
    4.57-1.529 7.858-5.84 7.858-10.933C23.5 5.65 18.352.5 12 .5Z"
    />
    </svg>
    );
    }

    function IconLinkedIn({ className }) {
    return (
    <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    >
    <path d="M4.983 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.983 0ZM.3 8.25h4.5V24H.3V8.25Zm7.548 0h4.311v2.134h.061c.6-1.137 2.067-2.334 4.253-2.334 4.547 0 5.39 2.993 5.39 6.885V24h-4.5v-7.72c0-1.84-.033-4.205-2.563-4.205-2.564 0-2.957 2.003-2.957 4.07V24h-4.5V8.25Z" />
    </svg>
    );
    }

    function IconDocument({ className }) {
    return (
    <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    >
    <path d="M6 2a2 2 0 0 0-2 2v16c0 1.105.895 2 2 2h12a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-4.828-4.828A2 2 0 0 0 13.172 3H6Zm7 1.5V8h4.5L13 3.5ZM8 11h8v2H8v-2Zm0 4h5v2H8v-2Z" />
    </svg>
    );  
    }

    export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <header className="fixed inset-x-0 top-0 z-50 bg-neutral-950/85 backdrop-blur">
    <nav className="relative flex h-16 items-center px-4 sm:px-8">
    <Link to="/" className="text-base font-semibold tracking-tight">
    <span className="font-bold lowercase">gridgxly</span>
    <span className="text-blue-300">.dev</span>
    </Link>


    <div className="hidden sm:flex gap-8 text-sm font-medium text-neutral-200 absolute left-1/2 -translate-x-1/2">
    {navLinks.map((link) => (
    <Link
    key={link.to}
    to={link.to}
    className="hover:text-white transition-colors"
    >
    {link.label}
    </Link>
    ))}
    </div>

    <div className="ml-auto hidden items-center gap-4 sm:flex">
    <a
    href="https://github.com/GridGxly"
    target="_blank"
    rel="noreferrer"
    className="text-neutral-200 hover:text-white transition-colors"
    >
    <span className="sr-only">GitHub</span>
    <IconGitHub className="h-5 w-5" />
    </a>
    <a
    href="https://www.linkedin.com/in/ralphnoel/"
    target="_blank"
    rel="noreferrer"
    className="text-neutral-200 hover:text-white transition-colors"
    >
    <span className="sr-only">LinkedIn</span>
    <IconLinkedIn className="h-5 w-5" />
    </a>
    <a
    href="/Ralph-Resume.pdf"
    className="text-neutral-200 hover:text-white transition-colors"
    >
    <span className="sr-only">Résumé</span>
    <IconDocument className="h-5 w-5" />
    </a>
    </div>


    <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Toggle navigation"
    className="sm:hidden text-neutral-100 ml-auto"
    >
    {isOpen ? (
    <span className="text-2xl leading-none">&times;</span>
    ) : (
    <span className="relative flex h-5 w-7 flex-col justify-between">
    <span className="block h-0.5 w-full rounded-full bg-current" />
    <span className="block h-0.5 w-full rounded-full bg-current" />
    <span className="block h-0.5 w-full rounded-full bg-current" />
    </span>
    )}
    </button>
    </nav>

    {isOpen && (
    <div className="sm:hidden bg-neutral-950/95">
    <div className="space-y-1 px-4 pb-4 pt-2 text-lg text-neutral-100">
    {navLinks.map((link) => (
    <Link
    key={link.to}
    to={link.to}
    className="block rounded-lg px-2 py-2 hover:bg-white/5"
    onClick={() => setIsOpen(false)}
    >
    {link.label}
    </Link>
    ))}

    <div className="mt-4 flex justify-center gap-5 pb-2 text-neutral-200">
    <a
    href="https://github.com/GridGxly"
    target="_blank"
    rel="noreferrer"
    className="hover:text-white transition-colors"
    >
    <span className="sr-only">GitHub</span>
    <IconGitHub className="h-6 w-6" />
    </a>
    <a
    href="https://www.linkedin.com/in/ralphnoel/"
    target="_blank"
    rel="noreferrer"
    className="hover:text-white transition-colors"
    >
    <span className="sr-only">LinkedIn</span>
    <IconLinkedIn className="h-6 w-6" />
    </a>
    <a
    href="/Ralph-Resume.pdf"
    className="hover:text-white transition-colors"
    >
    <span className="sr-only">Résumé</span>
    <IconDocument className="h-6 w-6" />
    </a>
    </div>
    </div>
    </div>
    )}
    </header>
    );
    }
