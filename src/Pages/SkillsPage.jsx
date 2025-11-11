    import {
    FaPython,
    FaJava,
    FaJs,
    FaHtml5,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaDocker,
    FaWindows,
    FaApple,
    } from "react-icons/fa";

    import {
    SiTypescript,
    SiCplusplus,
    SiPostgresql,
    SiR,
    SiNextdotjs,
    SiTailwindcss,
    SiVite,
    SiExpress,
    SiFigma,
    SiVercel,
    SiLinux,
    SiUnity,
    SiCss3,
    } from "react-icons/si";


    const skillGroups = [
    {
    title: "Languages",
    skills: [
    { name: "Python", Icon: FaPython, color: "#3776AB" },
    { name: "Java", Icon: FaJava, color: "#f89820" },
    { name: "JavaScript", Icon: FaJs, color: "#f7df1e" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
    { name: "C", Icon: SiCplusplus, color: "#a8b9cc" },
    { name: "C++", Icon: SiCplusplus, color: "#00599C" },
    { name: "C#", Icon: SiCplusplus, color: "#239120" },
    { name: "SQL (PostgreSQL)", Icon: SiPostgresql, color: "#4169E1" },
    { name: "HTML", Icon: FaHtml5, color: "#e34f26" },
    { name: "CSS", Icon: SiCss3, color: "#1572B6" },
    { name: "R", Icon: SiR, color: "#276DC3" },
    ],
    },
    {
    title: "Frameworks & Libraries",
    skills: [
    { name: "React", Icon: FaReact, color: "#61dafb" },
    { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
    { name: "Node.js", Icon: FaNodeJs, color: "#3c873a" },
    { name: "Vite", Icon: SiVite, color: "#646cff" },
    { name: "Express", Icon: SiExpress, color: "#ffffff" },
    ],
    },
    {
    title: "Tools & Platforms",
    skills: [
    { name: "Git", Icon: FaGitAlt, color: "#f05032" },
    { name: "GitHub", Icon: FaGithub, color: "#f5f5f5" },
    { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
    { name: "Docker", Icon: FaDocker, color: "#0db7ed" },
    { name: "Figma", Icon: SiFigma, color: "#f24e1e" },
    { name: "Windows", Icon: FaWindows, color: "#0078D4" },
    { name: "macOS", Icon: FaApple, color: "#ffffff" },
    { name: "Linux", Icon: SiLinux, color: "#fcc624" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
    { name: "Unity", Icon: SiUnity, color: "#ffffff" },
    ],
    },
    ];

    function SkillCard({ name, Icon, color }) {
    return (
    <div
    className="
    skill-card skill-float
    flex items-center justify-center
    rounded-2xl border border-slate-600/60
    bg-slate-900/10
    h-20 w-20 sm:h-24 sm:w-24
    backdrop-blur-sm
    transition
    hover:border-grid-accent-soft
    hover:bg-slate-900/40
    "
    aria-label={name}
    >
    <Icon className="text-2xl sm:text-3xl" style={{ color }} />
    </div>
    );
    }

    export default function SkillsPage() {
    return (
    <section className="space-y-10">
    <div className="mb-6 text-center">
    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-grid-accent-soft">
        Skills
        </h1>
    </div>

    {skillGroups.map((group) => (
    <section key={group.title} className="space-y-4">
    <h2 className="text-base sm:text-lg font-semibold text-neutral-100">
    {group.title}
    </h2>

    <div
    className="
    skill-grid
    grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6
    gap-5 sm:gap-6
    "
    >
    {group.skills.map((skill) => (
    <SkillCard key={skill.name} {...skill} />
    ))}
    </div>
    </section>
    ))}
    </section>
    );
}
