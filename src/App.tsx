import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
// import Services from './pages/Services'; // Temporarily disabled
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import { NavigationContext } from './contexts/NavigationContext';
import type { Page } from './contexts/NavigationContext';
import './App.css';
import './styles/pages.css';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
      default:
        return <Home />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate: setCurrentPage }}>
      <div className="app">
        <MainLayout>
          {renderPage()}
        </MainLayout>
      </div>
    </NavigationContext.Provider>
  );
}

export default App
