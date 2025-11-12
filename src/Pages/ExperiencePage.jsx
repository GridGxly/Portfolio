import { useNavigate } from "react-router-dom";

const experiences = [
    {
    title: "Knight Hacks Kickstart Mentee",
    company: "Knight Hacks",
    date: "Aug 2025 — Present",
    location: "Orlando, FL · On-site",
    type: "Student program",
    bullets: [
    "Accepted for Knight Hacks' Kickstart mentorship program focused on real projects and internship prep.",
    "Attended technical workshops and mentorship sessions led by Knight Hacks members.",
    "Collaborated with other mentees on small projects and hackathon ideas.",
    "Practiced core skills in React, TypeScript, Git/GitHub, and modern web tooling.",
    ],
    tags: ["Knight Hacks", "Web Dev", "Mentorship", "Hackathons"],
    image: "/ExperiencesImages/knight-hacks.svg",
    imageAlt: "Knight Hacks Kickstart program event",
},
{
    title: "Package Handler",
    company: "FedEx",
    date: "Sep 2022 — Dec 2022",
    location: "Davenport, FL · On-site",
    type: "Seasonal",
    bullets: [
    "Worked in a fast-paced warehouse environment, helping keep packages moving safely and on time.",
    "Loaded, unloaded, and staged packages while following strict safety procedures.",
    "Coordinated with team members to hit tight timing and accuracy targets.",
    "Built strong habits around reliability, time management, and attention to detail.",
    ],
    tags: ["Teamwork", "Time Management", "Warehouse Operations", "Reliability"],
    image: "/ExperiencesImages/fedex.jpg",
    imageAlt: "FedEx warehouse environment",
    },
];

function ExperienceCard({
    title,
    company,
    date,
    location,
    type,
    bullets,
    tags,
    image,
    imageAlt,
}) {
    return (
    <article
    className="
        group relative overflow-hidden
        rounded-3xl border border-grid-border/80
        bg-slate-950/40 px-6 py-6 sm:px-8 sm:py-7
        shadow-[0_18px_50px_rgba(15,23,42,0.8)]
        transition-transform duration-200
        hover:-translate-y-1
    "
    >
    {image && (
        <div
        className="
            pointer-events-none
            absolute inset-[1px]
            rounded-[1.4rem]
            opacity-0
            transition-opacity duration-300 ease-out
            group-hover:opacity-100
        "
        >
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/90" />
        </div>
    )}

    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
        <header className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
            <p className="text-sm text-slate-300">{company}</p>
        </header>

        <ul className="mt-3 space-y-1 text-sm text-slate-300">
            {bullets.map((line) => (
            <li key={line} className="flex gap-2">
                <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-slate-400" />
                <span>{line}</span>
            </li>
            ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
            <span
                key={tag}
                className="
                rounded-full border border-slate-600/80
                bg-slate-900/70 px-3 py-1
                text-xs font-medium text-slate-200
                "
            >
                {tag}
            </span>
            ))}
        </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right text-xs sm:text-sm">
        <div className="text-slate-300">{date}</div>
        <div className="text-slate-400">{location}</div>
        <span
            className="
            mt-1 inline-flex items-center justify-center
            rounded-full border border-slate-600/80
            bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-100
            "
        >
            {type}
        </span>
        </div>
    </div>
    </article>
    );
}

export default function ExperiencePage() {
    return (
    <section className="space-y-8">
    <div className="mb-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-grid-accent-soft">
        Experience
        </h1>
    </div>

    <div className="space-y-6">
        {experiences.map((exp) => (
        <ExperienceCard key={exp.title} {...exp} />
        ))}
        </div>
    </section>
    );
}
