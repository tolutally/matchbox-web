import { useMemo, useState, useRef, useEffect } from 'react';
import { useForm } from '@formspree/react';
import { validateEmail, validatePhone, isBotSubmission } from '../../utils/validation';
import { COUNTRIES, DEFAULT_COUNTRY } from '../../utils/countries';
import './PricingCTA.css';

type PricingCTAProps = {
  imageSrc: string;
  imageAlt?: string;
};

// Track submissions to prevent duplicates (in-memory for session)
const submittedCombinations = new Set<string>();

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
}: PricingCTAProps) => {
  const [state, formspreeSubmit] = useForm("xyzrrazj");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY.dialCode);
  const [status, setStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const formLoadTime = useRef<number>(Date.now());
  const currentAction = useRef<'email' | 'call'>('email');

  // Reset form load time when component mounts
  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  // Handle success/error from Formspree
  useEffect(() => {
    if (state.succeeded) {
      const fullPhone = `${countryCode}${phone}`;
      const key = `${email.toLowerCase()}-${fullPhone.replace(/[^\d]/g, '')}`;
      submittedCombinations.add(key);
      
      if (currentAction.current === 'email') {
        setStatus('Done — check your inbox.');
      } else {
        setStatus("Done — we'll call you.");
      }
      setStatusType('success');
    } else if (state.errors) {
      setStatus('Something went wrong. Please try again.');
      setStatusType('error');
    }
  }, [state.succeeded, state.errors, email, phone, countryCode]);

  const emailValidation = useMemo(() => validateEmail(email), [email]);
  const phoneValidation = useMemo(() => validatePhone(`${countryCode}${phone}`), [phone, countryCode]);

  // Check for duplicate submission
  const isDuplicate = useMemo(() => {
    if (!email && !phone) return false;
    const key = `${email.toLowerCase()}-${countryCode}${phone.replace(/[^\d]/g, '')}`;
    return submittedCombinations.has(key);
  }, [email, phone, countryCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setStatusType(null);

    // Bot check
    if (isBotSubmission(formLoadTime.current)) {
      setStatus('Please take your time filling the form.');
      setStatusType('error');
      return;
    }

    // Duplicate check
    if (isDuplicate) {
      setStatus("You've already submitted. We'll be in touch!");
      setStatusType('error');
      return;
    }

    const action = currentAction.current;

    if (action === 'email') {
      // Email validation
      const emailCheck = validateEmail(email);
      if (!emailCheck.isValid) {
        setStatus(emailCheck.error || 'Enter a valid email.');
        setStatusType('error');
        return;
      }
    } else {
      // Call validation (Phone required)
      const phoneCheck = validatePhone(`${countryCode}${phone}`);
      if (!phoneCheck.isValid) {
        setStatus(phoneCheck.error || 'Enter a valid phone number.');
        setStatusType('error');
        return;
      }
    }

    // Submit to Formspree
    formspreeSubmit(e);
  };

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
              <form className="cta-form-fields" onSubmit={handleSubmit}>
                <input type="hidden" name="phone" value={`${countryCode}${phone}`} />
                <input type="hidden" name="_subject" value="New Request from Pricing Page" />
                <input type="hidden" name="source" value="pricing_cta" />

                <label className="cta-form-label">
                  <span>Email</span>
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    type="email"
                    className={`cta-form-input ${email && !emailValidation.isValid ? 'input-error' : ''}`}
                    disabled={state.submitting}
                  />
                </label>

                <label className="cta-form-label">
                  <span>Phone</span>
                  <div className="cta-phone-group">
                    <input
                      list="cta-country-codes"
                      className="cta-country-select"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      placeholder="+1"
                      disabled={state.submitting}
                    />
                    <datalist id="cta-country-codes">
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.dialCode}>
                          {country.name} {country.flag}
                        </option>
                      ))}
                    </datalist>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      type="tel"
                      className={`cta-form-input ${phone && !phoneValidation.isValid ? 'input-error' : ''}`}
                      disabled={state.submitting}
                    />
                  </div>
                </label>

                <div className="cta-form-buttons">
                  <button
                    type="submit"
                    name="action"
                    value="email"
                    onClick={() => currentAction.current = 'email'}
                    className="cta-email-btn"
                    disabled={state.submitting}
                  >
                    {state.submitting && currentAction.current === 'email' ? 'Sending...' : 'Email me'}
                  </button>

                  <button
                    type="submit"
                    name="action"
                    value="call"
                    onClick={() => currentAction.current = 'call'}
                    className="cta-call-btn"
                    disabled={state.submitting}
                  >
                    {state.submitting && currentAction.current === 'call' ? 'Sending...' : 'Call me'}
                  </button>
                </div>

                {status && (
                  <p className={`cta-status ${statusType === 'error' ? 'cta-status-error' : 'cta-status-success'}`}>
                    {status}
                  </p>
                )}

                <p className="cta-disclaimer">
                  No spam. Just a quick follow-up about Matchbox.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
