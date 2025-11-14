import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import GridgxlyAssistant from "./components/GridgxlyAssistant";
import OverlayChips from "./components/OverlayChips";
import HomePage from "./Pages/HomePage";
import ExperiencePage from "./Pages/ExperiencePage";
import ProjectsPage from "./Pages/ProjectsPage";
import SkillsPage from "./Pages/SkillsPage";
import AdminView from "./Pages/AdminView";
import LogsPage from "./Pages/LogsPage";
import ProtectedPage from "./components/ProtectedPage";
import SiteLockGate from "./components/SiteLockGate";
import ContactPage from "./Pages/ContactPage";

function PageTransition({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-grid-border/60 pt-6 text-center text-xs text-neutral-400 sm:text-sm">
      <p>© {new Date().getFullYear()} Ralph Clavens Love Noel. All rights reserved.</p>
    </footer>
  );
}

function AppShell() {
  const location = useLocation();
  return (
    <div id="top" className="min-h-screen bg-grid-bg text-grid-text">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 pt-28 pb-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
            <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
            <Route path="/adminview" element={<ProtectedPage><AdminView /></ProtectedPage>} />
            <Route path="/logs" element={<ProtectedPage><LogsPage /></ProtectedPage>} />
            <Route path="*" element={<PageTransition><div className="text-slate-300">404 — Not Found</div></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </main>


      <OverlayChips />
      <GridgxlyAssistant />
    </div>
  );
}

export default function App() {
  return (
    <SiteLockGate>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </SiteLockGate>
  );
}
