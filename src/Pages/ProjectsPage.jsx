import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/site-context";

// color styles for cards
const colorMap = {
  blue:   { ring: "ring-sky-400/40",     chip: "bg-sky-400/15 text-sky-200",       glow: "via-sky-500/20" },
  orange: { ring: "ring-amber-400/40",   chip: "bg-amber-400/15 text-amber-200",   glow: "via-amber-500/20" },
  green:  { ring: "ring-emerald-400/40", chip: "bg-emerald-400/15 text-emerald-200", glow: "via-emerald-500/20" },
};

function TechChip({ label, color = "blue" }) {
  const c = colorMap[color] ?? colorMap.blue;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${c.chip} border border-white/5`}>
      {label}
    </span>
  );
}

function ProjectCard({ p, onOpen }) {
  const c = colorMap[p.color] ?? colorMap.blue;

  const openDetails = (e) => {
    e.stopPropagation();
    onOpen(p);
  };

  return (
    <article
      onClick={openDetails}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur
      transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,0,0,0.25)]
      ring-1 ${c.ring}`}
    >
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{p.title}</h3>
          <p className="truncate text-sm text-slate-300">{p.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-slate-950/70 hover:bg-slate-900"
              aria-label="Open GitHub"
              title="GitHub"
            >
              <FaGithub className="text-xl text-slate-200" />
            </a>
          )}
        </div>
      </div>

      <div className={`mx-4 rounded-xl border border-white/10 bg-gradient-to-br from-slate-800 ${c.glow} to-transparent`}>
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block"
          title="Open live site"
        >
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
            {p.image ? (
              <img
                src={p.image}
                alt={`${p.title} preview`}
                className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
              />
            ) : (
              <div className="h-full w-full bg-slate-800/60" />
            )}
          </div>
        </a>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-md border border-white/10 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300">
            {p.timeframe}
          </span>
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-white/10"
          >
            View live <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>

        <p className="text-sm leading-relaxed text-slate-300">{p.summary}</p>

        <div className="flex flex-wrap gap-2">
          {p.stack?.map((t) => <TechChip key={t} label={t} color={p.color} />)}
          {p.apis?.map((t) => <TechChip key={t} label={t} color={p.color} />)}
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={openDetails}
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
          >
            View details
          </button>
          <span className="text-xs text-slate-400">Click card for more information</span>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const c = colorMap[project.color] ?? colorMap.blue;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 backdrop-blur ring-1 ${c.ring}`}
      >
        <div className="flex items-start justify-between gap-4 p-5">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold text-white">{project.title}</h3>
            <p className="truncate text-sm text-slate-300">{project.timeframe}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {project.image && (
          <div className="px-5">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="aspect-[16/9] w-full rounded-xl border border-white/10 object-cover"
            />
          </div>
        )}

        <div className="space-y-4 p-5">
          <p className="text-slate-300">{project.summary}</p>

          {project.details?.length > 0 && (
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {project.details.map((d, i) => (<li key={i}>{d}</li>))}
            </ul>
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-200">Stack & APIs</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((t) => <TechChip key={t} label={t} color={project.color} />)}
              {project.apis?.map((t) => <TechChip key={t} label={t} color={project.color} />)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              >
                <FaExternalLinkAlt /> Open live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
              >
                <FaGithub /> GitHub repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState(null);

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-grid-accent-soft sm:text-4xl">
        Projects
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} onOpen={setActive} />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
