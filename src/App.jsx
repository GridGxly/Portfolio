  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Navbar from "./components/Navbar";

  import HomePage from "./Pages/HomePage";
  import ExperiencePage from "./Pages/ExperiencePage";
  import ProjectsPage from "./Pages/ProjectsPage";
  import SkillsPage from "./Pages/SkillsPage";

  export default function App() {
  return (
  <BrowserRouter>
  <div id="top" className="min-h-screen bg-neutral-950 text-neutral-100">
  <Navbar />

  <main className="mx-auto w-full max-w-5xl px-6 pt-28 pb-16">
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/experience" element={<ExperiencePage />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/skills" element={<SkillsPage />} />
  </Routes>

  <footer className="mt-12 text-sm text-neutral-500">
            © {new Date().getFullYear()} GridGxly.dev
  </footer>
  </main>
  </div>
  </BrowserRouter>
  );
  }
