import { useState } from 'react';
import './HeroSection.css';
import { ContactModal } from '../ContactModal';
import { useNavigation } from '../../contexts/NavigationContext';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { navigate } = useNavigation();

  const handleSubmit = async (payload: { email: string; phone: string }) => {
    // Simulate API call
    console.log('Submitting:', payload);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Return true for success, false for failure
    return true;
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-dot">
            <span className="badge-dot-ping" />
            <span className="badge-dot-solid" />
          </span>
          New: Matchbox voice agents for bookings, reminders &amp; follow-ups
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Handle high call volumes <br />
          <span className="hero-headline-gradient animate-shine">
            without hiring more staff.
          </span>
        </h1>

        {/* Subtext */}
        <p className="hero-subtext">
          Deploy autonomous AI agents that answer calls, book appointments, and
          manage reminders and follow-ups 24/7. Turn your overloaded phone lines
          into a smooth, predictable operations engine.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <div className="hero-btn-primary-wrapper">
            <button 
              className="hero-btn hero-btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Start Automating Calls
            </button>
          </div>

          <button className="hero-btn hero-btn-secondary" onClick={() => navigate('call-me')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            See Matchbox in Action
          </button>
        </div>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />

        {/* Logos / Social Proof - Temporarily disabled
        <div className="hero-social-proof">
          <p className="social-proof-label">
            TRUSTED BY BUSY CLINICS &amp; SERVICE TEAMS
          </p>
          <div className="social-proof-logos">
            <div className="logo-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16" />
              </svg>
              <span>Clyde Medical</span>
            </div>

            <div className="logo-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              </svg>
              <span>BrightSide Dental</span>
            </div>

            <div className="logo-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>PrimeCare Physio</span>
            </div>

            <div className="logo-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
              </svg>
              <span>24/7 Plumbing Co.</span>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default HeroSection;
