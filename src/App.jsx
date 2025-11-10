  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Navbar from "./components/Navbar";

  import HomePage from "./Pages/HomePage";
  import ExperiencePage from "./Pages/ExperiencePage";
  import ProjectsPage from "./Pages/ProjectsPage";
  import SkillsPage from "./Pages/SkillsPage";

  export default function App() {
  return (
  <BrowserRouter>
  <div id="top" className="min-h-screen bg-grid-bg text-grid-text">
  <Navbar />

  <main className="mx-auto w-full max-w-5xl px-6 pt-28 pb-16">
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/experience" element={<ExperiencePage />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/skills" element={<SkillsPage />} />
  </Routes>

  <footer className="mt-12 border-t border-neutral-800 pt-6 text-xs sm:text-sm text-neutral-500">
  <p>
  Made with{" "}
  <img
  src="/HeartGif.gif"
  alt="One Piece style heart emoji"
  className="inline h-4 w-4 align-text-bottom mx-1"
  />

   by Ralph
</p>


  <p className="mt-1">
  © {new Date().getFullYear()} Ralph Clavens Love Noel. All rights
  reserved.
  </p>
  </footer>
  </main>
  </div>
  </BrowserRouter>
  );
  }
