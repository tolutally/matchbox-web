import { useState, useMemo, useRef, useEffect } from 'react';
import { validateEmail, isBotSubmission } from '../utils/validation';
import './Contact.css';

// Track submissions to prevent duplicates
const submittedEmails = new Set<string>();

interface FormData {
  name: string;
  email: string;
  orgType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    orgType: 'Financial Services',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formLoadTime = useRef<number>(Date.now());
  const honeypot = useRef<string>('');

  // Reset form load time on mount
  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  // Name validation
  const nameValidation = useMemo(() => {
    if (!formData.name) return { valid: false, error: '' };
    
    const trimmed = formData.name.trim();
    
    // Minimum 2 characters
    if (trimmed.length < 2) {
      return { valid: false, error: 'Name must be at least 2 characters.' };
    }
    
    // No numbers or special characters (allow spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
      return { valid: false, error: 'Please enter a valid name.' };
    }
    
    // Block obvious fake names
    const fakeNames = ['test', 'asdf', 'qwerty', 'fake', 'sample', 'demo', 'aaa', 'bbb'];
    if (fakeNames.includes(trimmed.toLowerCase())) {
      return { valid: false, error: 'Please enter your real name.' };
    }
    
    return { valid: true, error: '' };
  }, [formData.name]);

  // Message validation
  const messageValidation = useMemo(() => {
    if (!formData.message) return { valid: false, error: '' };
    
    const trimmed = formData.message.trim();
    
    // Minimum 10 characters
    if (trimmed.length < 10) {
      return { valid: false, error: 'Please provide more details (at least 10 characters).' };
    }
    
    // Maximum 2000 characters
    if (trimmed.length > 2000) {
      return { valid: false, error: 'Message is too long (max 2000 characters).' };
    }
    
    // Check for spam patterns (excessive URLs)
    const urlCount = (trimmed.match(/https?:\/\//g) || []).length;
    if (urlCount > 3) {
      return { valid: false, error: 'Too many links in message.' };
    }
    
    return { valid: true, error: '' };
  }, [formData.message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus('idle');

    // Honeypot check
    if (honeypot.current) {
      setErrors({ general: 'Something went wrong. Please try again.' });
      return;
    }

    // Bot check
    if (isBotSubmission(formLoadTime.current)) {
      setErrors({ general: 'Please take your time filling out the form.' });
      return;
    }

    // Validate all fields
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!nameValidation.valid) {
      newErrors.name = nameValidation.error;
    }

    const emailCheck = validateEmail(formData.email);
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailCheck.isValid) {
      newErrors.email = emailCheck.error;
    } else if (submittedEmails.has(formData.email.toLowerCase())) {
      newErrors.email = "You've already submitted. We'll be in touch!";
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (!messageValidation.valid) {
      newErrors.message = messageValidation.error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      console.log('Contact form submission:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Track successful submission
      submittedEmails.add(formData.email.toLowerCase());
      
      setStatus('success');
      setFormData({ name: '', email: '', orgType: 'Financial Services', message: '' });
    } catch {
      setStatus('error');
      setErrors({ general: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section className="contact-section" id="contact">
      {/* Background Glow */}
      <div className="contact-bg-glow">
        <div className="contact-glow-orb"></div>
      </div>

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <span className="contact-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6l8 5 8-5" />
              <rect width="20" height="14" x="2" y="5" rx="2" />
            </svg>
            Let's Work Together
          </span>
          <h2 className="contact-title">
            Ready to <span className="contact-title-accent">collaborate?</span>
          </h2>
          <p className="contact-subtitle">
            Whether you need help with healthcare communication, AI integration, or patient engagement, 
            we're here to help bring your vision to life.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-card">
            <h3 className="contact-form-title">Send a Message</h3>
            
            {status === 'success' ? (
              <div className="form-success">
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h4>Message Sent!</h4>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button 
                  type="button" 
                  className="form-reset-btn"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  onChange={(e) => { honeypot.current = e.target.value; }}
                />

                {errors.general && (
                  <div className="form-error-banner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4" />
                      <path d="M12 16h.01" />
                    </svg>
                    {errors.general}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Organization Type</label>
                  <select 
                    name="orgType"
                    className="form-select"
                    value={formData.orgType}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  >
                    <option>Financial Services</option>
                    <option>Non-Profit</option>
                    <option>Health Care</option>
                    <option>Skilled Trades</option>
                    <option>Others</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                    placeholder="Tell us about your needs..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                  <span className="char-count">{formData.message.length}/2000</span>
                </div>

                <button type="submit" className="form-submit-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <span className="btn-spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                              strokeLinejoin="round"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            {/* Email Card */}
            <div className="info-card">
              <div className="info-card-content">
                <div className="info-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6l8 5 8-5" />
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                  </svg>
                </div>
                <div className="info-text">
                  <h3 className="info-title">Email</h3>
                  <p className="info-value">hello@matchboxlab.xyz</p>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="info-card">
              <div className="info-card-content">
                <div className="info-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <div className="info-text">
                  <h3 className="info-title">Schedule a Call</h3>
                  <p className="info-value">Book a free consultation</p>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="info-card">
              <h3 className="social-title">Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="contact-bottom-glow">
        <div className="contact-glow-line"></div>
        <div className="contact-divider"></div>
      </div>
    </section>
  );
};

export default Contact;