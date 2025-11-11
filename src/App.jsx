import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./Pages/HomePage";
import ProjectsPage from "./Pages/ProjectsPage";
import ExperiencePage from "./Pages/ExperiencePage";
import SkillsPage from "./Pages/SkillsPage";

import AdminView from "./Pages/AdminView";
import LogsPage from "./Pages/LogsPage";
import ProtectedPage from "./components/ProtectedPage";

import GridgxlyAssistant from "./components/GridgxlyAssistant";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />

          <Route
            path="/adminview"
            element={
              <ProtectedPage>
                <AdminView />
              </ProtectedPage>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedPage>
                <LogsPage />
              </ProtectedPage>
            }
          />
        </Routes>


        <GridgxlyAssistant />
      </div>
    </Router>
  );
}

export default App;
