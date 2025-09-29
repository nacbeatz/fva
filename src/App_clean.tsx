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
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
