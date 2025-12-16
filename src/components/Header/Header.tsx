import './Header.css';
import { useNavigation } from '../../contexts/NavigationContext';
import type { Page } from '../../contexts/NavigationContext';

interface HeaderProps {
  currentPage?: Page;
  onNavigate?: (page: Page) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const { currentPage, navigate } = useNavigation();

  const handleNavigation = (page: Page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      navigate(page);
    }
  };

  const isActive = (page: Page) => currentPage === page;

  const navItems = [
    { page: 'home' as Page, label: 'Home' },
    { page: 'about' as Page, label: 'About' },
    // { page: 'services' as Page, label: 'Services' }, // Temporarily disabled
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
        <nav className="nav">
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
      </div>
    </header>
  );
};

export default Header;