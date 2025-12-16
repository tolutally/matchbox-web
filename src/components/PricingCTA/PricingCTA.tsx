import { useMemo, useState } from 'react';
import './PricingCTA.css';

type PricingCTAProps = {
  imageSrc: string;
  imageAlt?: string;
  onEmailMe?: (payload: { email: string; phone?: string }) => void;
  onCallMe?: (payload: { email?: string; phone: string }) => void;
};

const Chip = ({ text }: { text: string }) => {
  return (
    <div className="cta-chip">
      <div className="cta-chip-content">
        <span className="cta-chip-dot" />
        <span className="cta-chip-text">{text}</span>
      </div>
    </div>
  );
};

const PricingCTA = ({ 
  imageSrc, 
  imageAlt = 'Matchbox preview',
  onEmailMe, 
  onCallMe 
}: PricingCTAProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const isPhoneValid = useMemo(() => phone.replace(/[^\d+]/g, '').length >= 10, [phone]);

  function handleEmailMe() {
    setStatus(null);
    if (!isEmailValid) return setStatus('Enter a valid email.');
    onEmailMe?.({ email, phone: phone || undefined });
    setStatus('Done — check your inbox.');
  }

  function handleCallMe() {
    setStatus(null);
    if (!isPhoneValid) return setStatus('Enter a valid phone number.');
    onCallMe?.({ phone, email: email || undefined });
    setStatus("Done — we'll call you.");
  }

  return (
    <section className="pricing-cta">
      <div className="grid-corners-bottom" />

      {/* Glow blobs */}
      <div className="cta-glow-left" />
      <div className="cta-glow-right" />

      <div className="cta-container">
        <div className="cta-grid">
          {/* LEFT — image (60%) */}
          <div className="cta-left">
            {/* Floating Glass Orbit UI Element (Bottom Left) */}
            <div className="floating-orbit-secondary">
              <div className="orbit-container">
                {/* Orbiting ring */}
                <div className="orbit-ring-outer orbit-ring-reverse" />

                {/* Center glass sphere */}
                <div className="orbit-center-wrapper">
                  <div className="orbit-glass-sphere orbit-glass-sphere-lime">
                    <div className="orbit-sphere-highlight" />
                    <div className="orbit-sphere-icon orbit-sphere-icon-lime">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Orbiting particles */}
                <div className="orbit-particle orbit-particle-1 orbit-particle-lime" />
                <div className="orbit-particle orbit-particle-2" />
                <div className="orbit-particle orbit-particle-3 orbit-particle-lime" />
              </div>

              {/* Glass info card */}
              <div className="orbit-info-card">
                <div className="orbit-info-content">
                  <div className="orbit-info-dot" />
                  <span>Call Generation</span>
                </div>
              </div>
            </div>

            <div className="cta-image-wrapper">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="cta-image"
              />

              {/* Subtle overlay tint */}
              <div className="cta-image-overlay" />

              {/* Bottom chips */}
              <div className="cta-bottom-chips">
                <Chip text="Inbound" />
                <Chip text="Outbound" />
                <Chip text="24/7" />
              </div>
            </div>
          </div>

          {/* RIGHT — compact form (40%) */}
          <div className="cta-right">
            {/* Floating Glass Orbit UI Element */}
            <div className="floating-orbit">
              <div className="orbit-container">
                {/* Orbiting ring */}
                <div className="orbit-ring-outer" />

                {/* Center glass sphere */}
                <div className="orbit-center-wrapper">
                  <div className="orbit-glass-sphere">
                    <div className="orbit-sphere-highlight" />
                    <div className="orbit-sphere-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Orbiting particles */}
                <div className="orbit-particle orbit-particle-1" />
                <div className="orbit-particle orbit-particle-2" />
                <div className="orbit-particle orbit-particle-3" />
              </div>
            </div>

            <div className="cta-badge">
              <span className="cta-badge-dot" />
              Inbound + outbound
            </div>

            <h2 className="cta-headline">Get a callback.</h2>

            <p className="cta-description">
              Drop your details and we'll reach out.
            </p>

            <div className="cta-form-card">
              <div className="cta-form-fields">
                <label className="cta-form-label">
                  <span>Email</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    type="email"
                    className="cta-form-input"
                  />
                </label>

                <label className="cta-form-label">
                  <span>Phone</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    className="cta-form-input"
                  />
                </label>

                <div className="cta-form-buttons">
                  <button
                    type="button"
                    onClick={handleEmailMe}
                    className="cta-email-btn"
                  >
                    Email me
                  </button>

                  <button
                    type="button"
                    onClick={handleCallMe}
                    className="cta-call-btn"
                  >
                    Call me
                  </button>
                </div>

                {status && <p className="cta-status">{status}</p>}

                <p className="cta-disclaimer">
                  No spam. Just a quick follow-up about Matchbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
