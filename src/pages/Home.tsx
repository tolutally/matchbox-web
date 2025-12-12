import HeroSection from '../components/HeroSection';
import { MatchboxUiMockupSection } from '../components/MatchboxUiMockupSection';
import { StatsSection } from '../components/StatsSection';
import { OutcomeSection } from '../components/OutcomeSection';
import { ProcessSection } from '../components/ProcessSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { SecuritySection } from '../components/SecuritySection';
import { useNavigation } from '../contexts/NavigationContext';
import './Home.css';

const Home = () => {
  const { navigate } = useNavigation();

  return (
    <div className="home">
      <HeroSection />
      <MatchboxUiMockupSection />
      <StatsSection />
      <OutcomeSection />
      <ProcessSection />
      <TestimonialsSection />
      <SecuritySection />

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Let's build something amazing together.</p>
          <button className="btn btn-primary" onClick={() => navigate('contact')}>Contact Us</button>
        </div>
      </section>
    </div>
  );
};

export default Home;