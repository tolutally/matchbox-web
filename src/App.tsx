import { useState, useEffect, useCallback } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
// import Services from './pages/Services'; // Temporarily disabled
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import CallMe from './pages/CallMe';
import PrivateDemo from './pages/PrivateDemo';
import Admin from './pages/Admin';
import { NavigationContext } from './contexts/NavigationContext';
import type { Page } from './contexts/NavigationContext';
import './App.css';
import './styles/pages.css';

const pageToPath: Record<Page, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  pricing: '/pricing',
  contact: '/contact',
  'call-me': '/call-me',
  'private-demo': '/private-demo',
  admin: '/admin',
};

const normalizePath = (path: string) => {
  const cleaned = path.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned.toLowerCase();
};

const getPageFromPath = (path: string): Page => {
  const normalized = normalizePath(path);
  const match = (Object.entries(pageToPath) as [Page, string][])
    .find(([, targetPath]) => targetPath === normalized);
  return match ? match[0] : 'home';
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window === 'undefined') return 'home';
    return getPageFromPath(window.location.pathname);
  });

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    if (typeof window === 'undefined') return;

    const targetPath = pageToPath[page] ?? '/';
    if (normalizePath(window.location.pathname) !== normalizePath(targetPath)) {
      window.history.pushState({ page }, '', targetPath);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      // case 'services':
      //   return <Services />; // Temporarily disabled
      case 'pricing':
        return <Pricing />;
      case 'contact':
        return <Contact />;
      case 'call-me':
        return <CallMe />;
      case 'private-demo':
        return <PrivateDemo />;
      case 'admin':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      <div className="app">
        <MainLayout>
          {renderPage()}
        </MainLayout>
      </div>
    </NavigationContext.Provider>
  );
}

export default App
