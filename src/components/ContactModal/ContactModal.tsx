import { useState, useEffect, useRef } from 'react';
import { useForm } from '@formspree/react';
import { validateEmail, validatePhone, isBotSubmission } from '../../utils/validation';
import { COUNTRIES, DEFAULT_COUNTRY } from '../../utils/countries';
import './ContactModal.css';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: { email: string; phone: string }) => Promise<boolean> | boolean;
};

// Store submitted emails/phones to prevent duplicates in same session
const submittedEntries = new Set<string>();

const ContactModal = ({ isOpen, onClose, onSubmit }: ContactModalProps) => {
  const [state, formspreeSubmit] = useForm("xgvggbvp");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY.dialCode);
  const [errorMessage, setErrorMessage] = useState('');
  const formStartTime = useRef<number>(0);
  const honeypot = useRef<string>('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPhone('');
      setCountryCode(DEFAULT_COUNTRY.dialCode);
      setErrorMessage('');
      formStartTime.current = Date.now();
      honeypot.current = '';
    }
  }, [isOpen]);

  // Handle success state from Formspree
  useEffect(() => {
    if (state.succeeded) {
      const fullPhone = `${countryCode}${phone}`;
      const entryKey = `${email.toLowerCase()}-${fullPhone.replace(/[^\d]/g, '')}`;
      submittedEntries.add(entryKey);
      onSubmit?.({ email, phone: fullPhone });
    }
  }, [state.succeeded, email, phone, countryCode, onSubmit]);

  // Handle errors from Formspree
  useEffect(() => {
    if (state.errors) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  }, [state.errors]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    // Bot detection: form filled too quickly (under 2 seconds)
    if (isBotSubmission(formStartTime.current)) {
      setErrorMessage('Please take your time filling out the form.');
      return;
    }

    // Honeypot check (if somehow filled)
    if (honeypot.current) {
      setErrorMessage('Something went wrong. Please try again.');
      return;
    }

    // Email validation
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    // Phone validation
    const fullPhone = `${countryCode}${phone}`;
    const phoneCheck = validatePhone(fullPhone);
    if (!phoneCheck.isValid) {
      setErrorMessage(phoneCheck.error || 'Please enter a valid phone number.');
      return;
    }

    // Check for duplicate submissions in this session
    const entryKey = `${email.toLowerCase()}-${fullPhone.replace(/[^\d]/g, '')}`;
    if (submittedEntries.has(entryKey)) {
      setErrorMessage('You have already submitted this information.');
      return;
    }

    // Submit to Formspree
    formspreeSubmit(e);
  };

  const handleClose = () => {
    if (!state.submitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={handleClose} disabled={state.submitting}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {/* Glow effects */}
        <div className="modal-glow modal-glow-1" />
        <div className="modal-glow modal-glow-2" />

        {state.succeeded ? (
          /* Success State */
          <div className="modal-success">
            <div className="success-icon-wrapper">
              <div className="success-icon-ring" />
              <div className="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            </div>
            <h3 className="success-title">You're all set!</h3>
            <p className="success-message">
              We've received your details and will reach out shortly to help you start automating your calls.
            </p>
            <button className="modal-btn modal-btn-primary" onClick={handleClose}>
              Got it
            </button>
          </div>
        ) : (state.errors) || (errorMessage && !errorMessage.includes('valid')) ? (
          /* Error State */
          <div className="modal-error">
            <div className="error-icon-wrapper">
              <div className="error-icon-ring" />
              <div className="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
            </div>
            <h3 className="error-title">Oops! Something went wrong</h3>
            <p className="error-message">{errorMessage || "There was a problem submitting your form"}</p>
            <div className="error-actions">
              <button className="modal-btn modal-btn-secondary" onClick={() => setErrorMessage('')}>
                Try again
              </button>
              <button className="modal-btn modal-btn-ghost" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <>
            <div className="modal-header">
              <div className="modal-badge">
                <span className="modal-badge-dot" />
                Get Started
              </div>
              <h2 className="modal-title">Start Automating Calls</h2>
              <p className="modal-subtitle">
                Enter your details and we'll reach out to help you set up your AI voice agents.
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <input type="hidden" name="phone" value={`${countryCode}${phone}`} />
              <input type="hidden" name="_subject" value="New Contact from Matchbox Website" />
              <input type="hidden" name="source" value="contact_modal" />
              
              <div className="modal-field">
                <label htmlFor="modal-email">Email</label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={state.submitting}
                  autoFocus
                />
              </div>

              <div className="modal-field">
                <label htmlFor="modal-phone">Phone Number</label>
                <div className="modal-phone-group">
                  <input
                    list="country-codes"
                    className="modal-country-select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    placeholder="+1"
                    disabled={state.submitting}
                  />
                  <datalist id="country-codes">
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.dialCode}>
                        {country.name} {country.flag}
                      </option>
                    ))}
                  </datalist>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    disabled={state.submitting}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="modal-inline-error">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                className="modal-btn modal-btn-primary modal-btn-submit"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <>
                    <span className="modal-spinner" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className="modal-disclaimer">
                By submitting, you agree to receive communications from Matchbox. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
