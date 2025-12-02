import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

const navLinks = [
{ to: "/experience", label: "Experience" },
{ to: "/projects", label: "Projects" },
{ to: "/skills", label: "Skills" },
{ to: "/contact", label: "Contact" },
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
        d="M12 .5C5.65.5.5 5.65.5 12.01c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56
        0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7
        1.16.08 1.76 1.19 1.76 1.19 1.02 1.76 2.69 1.25 3.35.96.11-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69
        0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18.9-.25 1.87-.39 2.85-.39
        .98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09
        0 4.42-2.69 5.39-5.26 5.68.42.36.79 1.06.79 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.79.56
        4.57-1.53 7.86-5.84 7.86-10.93C23.5 5.65 18.35.5 12 .5Z"
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
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.3 8.25h4.5V24H.3V8.25Zm7.55 0h4.3v2.13h.06c.6-1.13 2.06-2.33 4.25-2.33 4.55 0 5.39 3 5.39 6.89V24h-4.5v-7.72c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.96 2-2.96 4.06V24h-4.5V8.25Z" />
    </svg>
);
}


function IconResume({ className }) {
    return (
    <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    >
 
    <path d="M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.42l-4.82-4.82A2 2 0 0 0 12.17 2H7Zm6 1.5V8h4.5L13 3.5Z" />

    <path d="M14 11.25h3v1.5h-3v-1.5Zm0 3h4v1.5h-4v-1.5Z" />
    </svg>
    );
}

export default function Navbar() {
const [isOpen, setIsOpen] = useState(false);
const [isHidden, setIsHidden] = useState(false);
const navRef = useRef(null);
  const location = useLocation();


  useEffect(() => {
    const root = navRef.current;
    if (!root) return;

    const links = Array.from(root.querySelectorAll(".js-magnetic"));
    const cleanupFns = [];

    links.forEach((el) => {
      if (!(el instanceof HTMLElement)) return;

      const strength = 0.25;

      const handleMove = (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);

        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.35,
          ease: "expo.out",
        });
      };

      const handleLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "expo.out",
        });
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      cleanupFns.push(() => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      gsap.killTweensOf(links);
    };
  }, []);


  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 64) {
        setIsHidden(false);
        lastY = currentY;
        return;
      }

      if (currentY > lastY + 10) {
        setIsHidden(true);
      } else if (currentY < lastY - 10) {
        setIsHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const pillBase =
    "nav-link js-magnetic relative inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-medium text-slate-100/80 transition-colors duration-200 before:absolute before:-z-10 before:h-9 before:w-full before:origin-center before:scale-0 before:rounded-full before:bg-grid-accent-soft/30 before:blur before:transition-transform before:duration-200 hover:text-white hover:before:scale-100";

  const mobileLinkBase =
    "nav-link relative flex w-full items-center justify-start rounded-xl px-3 py-2 text-sm font-medium text-slate-100/80 transition-colors duration-200 hover:bg-grid-accent-soft/15";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-neutral-950/85 text-neutral-100 backdrop-blur transition-transform duration-300 will-change-transform ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        ref={navRef}
        className="relative flex h-16 w-full items-center px-4 sm:px-8 lg:px-12"
      >

        <div className="flex flex-none items-center">
          <Link
            to="/"
            className={`${pillBase} mr-3 text-lg sm:text-2xl font-semibold tracking-tight whitespace-nowrap leading-none`}
          >
            <span className="relative z-10 select-none">
              <span className="text-white">GridGxly</span>
              <span className="text-grid-accent-soft">.Dev</span>
            </span>
          </Link>
        </div>


        <div className="ml-auto hidden items-center gap-5 sm:flex">
          <div className="flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${pillBase} ${
                  isActive(link.to)
                    ? "text-cyan-300 before:scale-100 before:bg-grid-accent-soft/55"
                    : ""
                }`}
              >
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-1">
            <a
              href="https://github.com/GridGxly"
              target="_blank"
              rel="noreferrer"
              className="js-magnetic rounded-full p-2 text-neutral-200 transition-colors duration-200 hover:bg-grid-accent-soft/20 hover:text-grid-accent-soft"
            >
              <span className="sr-only">GitHub</span>
              <IconGitHub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ralphnoel/"
              target="_blank"
              rel="noreferrer"
              className="js-magnetic rounded-full p-2 text-neutral-200 transition-colors duration-200 hover:bg-grid-accent-soft/20 hover:text-grid-accent-soft"
            >
              <span className="sr-only">LinkedIn</span>
              <IconLinkedIn className="h-5 w-5" />
            </a>
            <a
              href="/Ralph-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="js-magnetic rounded-full p-2 text-neutral-200 transition-colors duration-200 hover:bg-grid-accent-soft/20 hover:text-grid-accent-soft"
            >
              <span className="sr-only">Résumé</span>
              <IconResume className="h-5 w-5" />
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
          className="ml-auto text-neutral-100 sm:hidden"
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
        <div className="border-t border-neutral-800 bg-neutral-950/95 sm:hidden">
          <div className="space-y-2 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${mobileLinkBase} ${
                  isActive(link.to) ? "bg-grid-accent-soft/15 text-cyan-300" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}

            <div className="mt-3 flex justify-center gap-4 pt-1 text-neutral-200">
              <a
                href="https://github.com/GridGxly"
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 transition-colors duration-200 hover:bg-grid-accent-soft/20 hover:text-grid-accent-soft"
              >
                <span className="sr-only">GitHub</span>
                <IconGitHub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ralphnoel/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 transition-colors duration-200 hover:bg-grid-accent-soft/20 hover:text-grid-accent-soft"
              >
                <span className="sr-only">LinkedIn</span>
                <IconLinkedIn className="h-5 w-5" />
              </a>
              <a
                href="/Ralph-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 transition-colors duration-200 hover:bg-grid-accent-soft/20 hover:text-grid-accent-soft"
              >
                <span className="sr-only">Résumé</span>
                <IconResume className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
