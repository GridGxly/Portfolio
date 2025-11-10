  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import GridgxlyAssistant from "./components/GridgxlyAssistant";
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

  <footer className="mt-16 border-t border-grid-border/60 pt-6 text-center text-xs text-neutral-400 sm:text-sm">
  <p className="flex items-center justify-center gap-1">
  <span>Made with</span>
  <span className="inline-block h-4 w-4 align-middle">
  <img
  src="/HeartGif.gif"
  alt="blue heart"
  className="h-full w-full object-contain"
  />
  </span>
  <span>by Ralph</span>
  </p>

  <p className="mt-1">
              © {new Date().getFullYear()} Ralph Clavens Love Noel. All rights
              reserved.
  </p>
  </footer>
  </main>

  <GridgxlyAssistant />
  </div>
  </BrowserRouter>
  );
}
