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

        {/* Navigation - Center */}
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
          
          {/* See in Action CTA Button - Mobile only (inside nav) */}
          <button
            onClick={() => handleNavigation('call-me')}
            className="header-cta-btn header-cta-btn-mobile"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            See in Action
          </button>
        </nav>

        {/* See in Action CTA Button - Desktop only (far right) */}
        <button
          onClick={() => handleNavigation('call-me')}
          className="header-cta-btn header-cta-btn-desktop"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          See in Action
        </button>

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
