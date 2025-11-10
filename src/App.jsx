  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Navbar from "./components/Navbar.jsx";
  import HomePage from "./Pages/HomePage.jsx";
  import ExperiencePage from "./Pages/ExperiencePage.jsx";
  import ProjectsPage from "./Pages/ProjectsPage.jsx";
  import SkillsPage from "./Pages/SkillsPage.jsx";
  import GridgxlyAssistant from "./components/GridgxlyAssistant.jsx"; // 👈 NEW

  export default function App() {
  return (
  <BrowserRouter>
  <div id="top" className="min-h-screen bg-neutral-950 text-neutral-100">
  <Navbar />

  <main className="pt-20">
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/experience" element={<ExperiencePage />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/skills" element={<SkillsPage />} />
  </Routes>
  </main>


  <GridgxlyAssistant />
  </div>
  </BrowserRouter>
  );
}
