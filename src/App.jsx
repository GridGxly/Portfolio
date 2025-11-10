  import Navbar from "./components/Navbar";

  export default function App() {
  const images = [
  "/memes/meme1.png",
  "/memes/meme2.png",
  "/memes/meme3.png",
  "/memes/meme4.png",
  ];

  return (
  <div id="top" className="min-h-screen bg-neutral-950 text-neutral-100">
  <Navbar />

  <main className="mx-auto w-full max-w-5xl px-6 pt-28 pb-16">

  <section id="hero">
  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Tailwind v3 finally working.......... Anyways, Welcome To GridGxly.Dev
  </h1>

  <p className="mt-6 text-lg text-neutral-300 max-w-2xl">
            Portfolio is unfortunately still in production, im sorry if you
            clicked this link hoping for something that was polished. Thanks for
            visiting though, I really appreciate it. 🙏
  <br />
  <span className="inline-block mt-2">
              There are a few images below, I hope they give you a good laugh
              and make the visit worth it. Have a great rest of your day🥀🥀🥀
  </span>
  </p>

  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {images.map((src, i) => (
  <figure
  key={src}
  className="overflow-hidden rounded-2xl bg-neutral-800 ring-1 ring-neutral-700/50"
  >
  <img
  src={src}
  alt={`funny image ${i + 1}`}
  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
  loading="lazy"
  />
  </figure>
  ))}
  </div>
  </section>

        <section id="experience" className="mt-24">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Nothing here yet but we will see.
          </p>
        </section>

        <section id="projects" className="mt-16">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="mt-2 text-sm text-neutral-400">
            This section is where all my projects will be stored like finbridge and voyagoAI
          </p>
        </section>

        <section id="skills" className="mt-16">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <p className="mt-2 text-sm text-neutral-400">
            all my tech stacks and tools will be held here. and lowk maybe something to bring some life to the skills section and not make it as generic.
          </p>
        </section>

        <section id="features" className="mt-16">
          <h2 className="text-2xl font-semibold">Features</h2>
          <p className="mt-2 text-sm text-neutral-400">
          </p>
        </section>

        <footer className="mt-12 text-sm text-neutral-500">
          © {new Date().getFullYear()} GridGxly.dev
        </footer>
      </main>
    </div>
  );
}
