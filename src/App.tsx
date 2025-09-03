import Team from './components/Team';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CompetitionsSection from './components/CompetitionsSection';
import SupportSection from './components/SupportSection';
import PartnersSection from './components/PartnersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import EventDetails from './components/EventDetails';

export default function App() {
  return (
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
            <PartnersSection />
            <ContactSection />
            <Footer />
          </>
        } />
        <Route path="/events/:slug" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}
