import { useState, useEffect } from 'react';
import './Header.css';
import { useNavigation } from '../../contexts/NavigationContext';
import type { Page } from '../../contexts/NavigationContext';

interface HeaderProps {
  currentPage?: Page;
  onNavigate?: (page: Page) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const { currentPage, navigate } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (page: Page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      navigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (page: Page) => currentPage === page;

  const navItems = [
    { page: 'home' as Page, label: 'Home' },
    { page: 'about' as Page, label: 'About' },
    // { page: 'services' as Page, label: 'Services' }, // Temporarily disabled
    { page: 'pricing' as Page, label: 'Pricing' },
    { page: 'contact' as Page, label: 'Contact' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <button 
          onClick={() => handleNavigation('home')} 
          className="logo"
          type="button"
        >
          <img src="/matchbox-logo-lite.png" alt="Matchbox" className="logo-image" />
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          type="button"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map(({ page, label }) => (
              <li key={page}>
                <button
                  onClick={() => handleNavigation(page)}
                  className={`nav-link ${isActive(page) ? 'active' : ''}`}
                  type="button"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'visible' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      </div>
    </header>
  );
};

export default Header;
