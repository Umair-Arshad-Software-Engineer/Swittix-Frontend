import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './theme.css';
import { PageBackgrounds } from './components/Backgrounds';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ProcessSection, ServicesPreview, SoftwareTypesPreview } from './components/Sections';
import { CtaBand } from './components/CtaBand';
import { Footer } from './components/Footer';
import { StartProject } from './components/startproject';
import { About } from './components/About';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Loader } from './components/Loader';

import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminErrorBoundary } from './admin/AdminErrorBoundary';
import { Solutions } from './components/Solutions';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';

// Initial load: wait for the logo animation to finish (~1.8s), hold briefly, then reveal.
const INITIAL_HOLD_MS = 300;        // pause on the finished logo before fading out
const INITIAL_MAX_MS = 3500;        // safety net in case the animation never reports completion
const ROUTE_LOAD_MS = 400;

function HomePage({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <TrustSection />
      <ServicesPreview />
      <SoftwareTypesPreview />
      <ProcessSection />
      <CtaBand onNavigate={onNavigate} />
    </>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [initialLoading, setInitialLoading] = useState(true);
  const [iconDone, setIconDone] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const isFirstRender = useRef(true);

  const handleIconComplete = useCallback(() => setIconDone(true), []);

  // Hide the initial loader shortly after the icon animation completes
  useEffect(() => {
    if (!iconDone) return;
    const id = setTimeout(() => setInitialLoading(false), INITIAL_HOLD_MS);
    return () => clearTimeout(id);
  }, [iconDone]);

  // Safety net: never leave the user stuck on the loader
  useEffect(() => {
    const id = setTimeout(() => setInitialLoading(false), INITIAL_MAX_MS);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setRouteLoading(true);
    const id = setTimeout(() => setRouteLoading(false), ROUTE_LOAD_MS);
    return () => clearTimeout(id);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const showLoader = initialLoading || routeLoading;
  const loaderVariant = initialLoading ? 'full' : 'route';

  if (isAdminRoute) {
    return (
      <AdminErrorBoundary>
        <AnimatePresence>
          {showLoader && (
            <Loader key="loader" variant={loaderVariant} onComplete={handleIconComplete} />
          )}
        </AnimatePresence>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AdminErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <AnimatePresence>
        {showLoader && (
          <Loader key="loader" variant={loaderVariant} onComplete={handleIconComplete} />
        )}
      </AnimatePresence>

      <NavBar currentRoute={location.pathname} onNavigate={handleNavigate} />

      <PageBackgrounds routeKey={location.pathname}>
        <div className="pt-[60px] sm:pt-20">
          <Routes>
            <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
            <Route path="/about" element={<About onNavigate={handleNavigate} />} />
            <Route path="/services" element={<Services onNavigate={handleNavigate} />} />
            <Route path="/solutions" element={<Solutions onNavigate={handleNavigate} />} />
            <Route path="/products" element={<Products onNavigate={handleNavigate} />} />
            <Route path="/portfolio" element={<Portfolio onNavigate={handleNavigate} />} />
            <Route path="/contact" element={<Contact onNavigate={handleNavigate} />} />
            <Route path="/start-project" element={<StartProject onNavigate={handleNavigate} />} />
          </Routes>
          <Footer onNavigate={handleNavigate} />
        </div>
      </PageBackgrounds>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AppShell />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;