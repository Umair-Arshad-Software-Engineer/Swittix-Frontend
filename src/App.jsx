import { useEffect, useRef, useState } from 'react';
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

// Minimum time the loader stays up, so fast route swaps / fast connections
// still register as an intentional loading beat rather than a flicker.
const INITIAL_LOAD_MS = 1100;
const ROUTE_LOAD_MS = 500;

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

  // One-time loader on first paint of the whole app.
  const [initialLoading, setInitialLoading] = useState(true);
  // Short loader on every subsequent in-app navigation.
  const [routeLoading, setRouteLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const id = setTimeout(() => setInitialLoading(false), INITIAL_LOAD_MS);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    // Skip firing a route loader on the very first mount — the initial
    // loader already covers it.
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

  // Admin pages get their own layout — no marketing NavBar/Footer/backgrounds.
  if (isAdminRoute) {
    return (
      <AdminErrorBoundary>
        <AnimatePresence>
          {showLoader && <Loader key="loader" variant={initialLoading ? 'full' : 'route'} />}
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
    <div className="min-h-screen bg-[#05070C]">
      <AnimatePresence>
        {showLoader && <Loader key="loader" variant={initialLoading ? 'full' : 'route'} />}
      </AnimatePresence>

      <NavBar currentRoute={location.pathname} onNavigate={handleNavigate} />

      <PageBackgrounds routeKey={location.pathname}>
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