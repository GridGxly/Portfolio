export const bio = {
name: "Ralph Clavens Love Noel",
tagline: "Valencia College • Seneff Honors • CS transfer pathway → UCF BHC",
location: "Orlando, FL, USA",
summary:
    "Early-career SWE focused on React, Vite, Tailwind, Node/Express, and AI agents. Active in hackathons (ShellHacks, KnightHacks)."
};

export const projects = [
{
    slug: "portfolio",
    title: "Portfolio",
    subtitle: "Personal site",
    timeframe: "Nov 2025 – Present",
    color: "blue",
    liveUrl: "https://gridgxly.dev/",
    githubUrl: "https://github.com/GridGxly/Portfolio",
    image: "/screenshots/portfolio.png",
    summary:
    "Accessible, animated personal site with a Jarvis-style voice assistant (G.R.I.D.G.X.L.Y.).",
    stack: ["React", "Vite", "JavaScript", "Tailwind", "OpenAI API", "Vercel"],
    apis: [],
    details: [
    "Responsive, keyboard-accessible components.",
    "Animated micro-interactions and theming.",
    "Updating my proffesional growth in my career"
    ],
    oneLiner:
    "Personal portfolio with an embedded voice assistant and clean, responsive UI."
},
{
    slug: "voyagoai",
    title: "VoyagoAI",
    subtitle: "Travel companion",
    timeframe: "Nov 2025 – Present",
    color: "orange",
    liveUrl: "https://voyago-ai.vercel.app/",
    githubUrl: "https://github.com/GridGxly/VoyagoAI",
    image: "/screenshots/voyago.jpg",
    summary:
    "Trip logging and smart recommendations; planned wishlists and collaborative boards.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vercel"],
    apis: [],
    details: [
    "Wishlists (future) and Footprints (past).",
    "Seeded itineraries and collaborative boards (planned)."
    ],
    oneLiner:
    "Travel logging + recommendations with modern React tooling."
},
{
    slug: "finbridgev2",
    title: "FinBridge V2",
    subtitle: "Knight Hacks Hackathon project",
    timeframe: "Oct 2025 – Present",
    color: "green",
    liveUrl: "https://fin-bridge-v2.vercel.app",
    githubUrl: "https://github.com/GridGxly/FinBridgeV2",
    image: "/screenshots/finbridge.jpg",
    summary:
    "Financial-literacy app for immigrant & bilingual communities; multilingual UI and plain-language explainers.",
    stack: ["React", "Vite", "Tailwind", "i18next", "Node", "Express", "Firebase", "Vercel"],
    apis: ["Plaid API", "Google Gemini API"],
    details: [
    "Multilingual UI with detection via i18next.",
    "Plain-language explainers and glossary.",
    "Planned: document translation, quizzes, saved terms."
    ],
    oneLiner:
    "Multilingual financial-literacy helper; hackathon build with room to grow."
}
];


export const skills = [
"React", "TypeScript", "JavaScript", "Node.js", "Express",
"Tailwind CSS", "Vite", "PostgreSQL", "Git/GitHub", "Docker"
];

export const experiences = [
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
    "Practiced core skills in React, TypeScript, Git/GitHub, and modern web tooling."
    ],
    tags: ["Knight Hacks", "Web Dev", "Mentorship", "Hackathons"],
    image: "/ExperiencesImages/knight-hacks.svg",
    imageAlt: "Knight Hacks Kickstart program event"
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
    "Built strong habits around reliability, time management, and attention to detail."
    ],
    tags: ["Teamwork", "Time Management", "Warehouse Operations", "Reliability, Attention to detail"],
    image: "/ExperiencesImages/fedex.jpg",
    imageAlt: "FedEx warehouse environment"
}
];


export function toPrompt() {
const projLines = projects
    .map(p => `• ${p.title} — ${p.oneLiner} (Stack: ${p.stack.join(", ")})`)
    .join("\n");

return [
    `BIO: ${bio.name} — ${bio.tagline} — ${bio.location}.`,
    `SUMMARY: ${bio.summary}`,
    `PROJECTS:\n${projLines}`,
    `SKILLS: ${skills.join(", ")}`,
].join("\n");
}
