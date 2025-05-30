import Team from './components/Team';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CompetitionsSection from './components/CompetitionsSection';
import SupportSection from './components/SupportSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <>
      {/* Global Background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-80 z-[-1]"></div>
      <div className="fixed inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-5 z-[-1]"></div>

      {/* Global Decorative elements */}
      <motion.div
        className="fixed top-40 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#0d46d7]/10 to-transparent blur-3xl z-[-1]"
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-l from-[#EE7A3F]/10 to-transparent blur-3xl z-[-1]"
        animate={{
          y: [0, 30, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutSection />
              <CompetitionsSection />
              <SupportSection />
              <div id="team-section">
                <Team />
              </div>
              <ContactSection />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </>
  );
}
