import type { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BackgroundLayer from '../components/BackgroundLayer';
import { useNavigation } from '../contexts/NavigationContext';
import './MainLayout.css';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentPage } = useNavigation();
  const showParticles = currentPage !== 'contact';

  return (
    <div className="main-layout">
      <BackgroundLayer enableParticles={showParticles} />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;