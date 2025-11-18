import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import GridgxlyAssistant from "./components/GridgxlyAssistant";
import OverlayChips from "./components/OverlayChips";
import ProtectedPage from "./components/ProtectedPage";

import HomePage from "./Pages/HomePage";
import ExperiencePage from "./Pages/ExperiencePage";
import ProjectsPage from "./Pages/ProjectsPage";
import SkillsPage from "./Pages/SkillsPage";
import LogsPage from "./Pages/LogsPage";
import ContactPage from "./Pages/ContactPage";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [clickCount, setClickCount] = useState(0);
  const [lastClick, setLastClick] = useState(0);

  const handleSecretClick = () => {
    const now = Date.now();

    // to make sure nobody thats not me accidently comes to the protectedpage,
    // this will make it so if the last click was too long ago the combo will reset
    if (now - lastClick > 800) {
      setClickCount(1);
      setLastClick(now);
      return;
    }

    const next = clickCount + 1;
    setLastClick(now);

    if (next >= 3) {
      setClickCount(0);
      navigate("/protected");
    } else {
      setClickCount(next);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-[#020617] text-slate-100">
      <Navbar />


      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="mt-10 h-px w-full bg-[#1f2937]" />

      <footer className="py-6 text-center text-xs text-slate-400">
  <p className="flex items-center justify-center gap-1">
    <span>Made with</span>
    <img
      src="/HeartGif.gif"
      alt="Animated blue heart"
      className="h-4 w-4"
    />
    <button
      type="button"
      onClick={handleSecretClick}
      className="relative px-1 text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
    >
      by Ralph
    </button>
  </p>
  <p className="mt-1">
    © {currentYear} Ralph Clavens Love Noel. All rights reserved.
  </p>
</footer>


      <GridgxlyAssistant />
      <OverlayChips />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/experience"
          element={
            <Layout>
              <ExperiencePage />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <ProjectsPage />
            </Layout>
          }
        />
        <Route
          path="/skills"
          element={
            <Layout>
              <SkillsPage />
            </Layout>
          }
        />
        <Route
          path="/logs"
          element={
            <Layout>
              <LogsPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/protected"
          element={
            <Layout>
              <ProtectedPage />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
