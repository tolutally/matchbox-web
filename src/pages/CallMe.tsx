import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useForm } from '@formspree/react';
import { validateEmail, validatePhone, isBotSubmission } from '../utils/validation';
import { COUNTRIES, DEFAULT_COUNTRY } from '../utils/countries';
import VapiWidget from '../components/VapiWidget';
import type { VapiWidgetHandle } from '../components/VapiWidget';
import './CallMe.css';

/**
 * CallMe Demo Page
 * 
 * Environment Variables Required (add to .env file):
 * 
 * VITE_VAPI_PUBLIC_KEY - Your Vapi public API key
 * VITE_VAPI_ASSISTANT_CLINIC - Assistant ID for Clinic/Spa/Health demo
 * VITE_VAPI_ASSISTANT_INSURANCE - Assistant ID for Insurance demo
 * VITE_VAPI_ASSISTANT_TRADES - Assistant ID for Trades demo
 */

type Industry = 'healthcare' | 'financial' | 'trades';
type DemoState = 'gate' | 'ready' | 'in-demo' | 'ended';

interface GateFormData {
  email: string;
  phone: string;
  countryCode: string;
  industry: Industry;
}

const INDUSTRIES: { id: Industry; label: string; description: string; icon: ReactNode }[] = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    description: 'Appointment reminder demo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/>
      </svg>
    ),
  },
  {
    id: 'financial',
    label: 'Financial Services',
    description: 'Reminder demo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    id: 'trades',
    label: 'Skilled Trades',
    description: 'Appointment booking demo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const DEMO_DURATION = 120; // 2 minutes in seconds
const DEMO_LIMIT_COUNT = 2;
const DEMO_LIMIT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const CallMe = () => {
  // Gate form state
  const [state, formspreeSubmit] = useForm("mkgddalv");
  const [gateData, setGateData] = useState<GateFormData>({
    email: '',
    phone: '',
    countryCode: DEFAULT_COUNTRY.dialCode,
    industry: 'healthcare',
  });
  const [gateError, setGateError] = useState('');
  const formStartTime = useRef<number>(Date.now());

  // Demo state
  const [demoState, setDemoState] = useState<DemoState>('gate');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(DEMO_DURATION);
  const [vapiError, setVapiError] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<{ role: 'assistant' | 'user'; text: string; id: number }[]>([]);
  const [liveTranscript, setLiveTranscript] = useState<string | null>(null);
  const [limitError, setLimitError] = useState<string | null>(null);
  
  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const vapiRef = useRef<VapiWidgetHandle>(null);
  const transcriptFeedRef = useRef<HTMLDivElement | null>(null);

  // Get assistant ID based on selected industry
  const getAssistantId = useCallback((industry: Industry): string => {
    switch (industry) {
      case 'healthcare':
        return import.meta.env.VITE_VAPI_ASSISTANT_HEALTHCARE || '';
      case 'financial':
        return import.meta.env.VITE_VAPI_ASSISTANT_FINANCIAL || '';
      case 'trades':
        return import.meta.env.VITE_VAPI_ASSISTANT_TRADES || '';
      default:
        return '';
    }
  }, []);

  // Rate limit helpers (per-device via localStorage)
  const getAllowedEmails = useCallback(() => {
    const raw = import.meta.env.VITE_VAPI_BYPASS_EMAILS || '';
    return raw
      .split(',')
      .map((email: string) => email.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const isEmailBypassed = useCallback(
    (email: string) => getAllowedEmails().includes(email.trim().toLowerCase()),
    [getAllowedEmails]
  );

  const getUsage = useCallback((): number[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('callme-demo-usage');
      const parsed: number[] = stored ? JSON.parse(stored) : [];
      const now = Date.now();
      const filtered = parsed.filter((ts) => now - ts < DEMO_LIMIT_WINDOW_MS);
      localStorage.setItem('callme-demo-usage', JSON.stringify(filtered));
      return filtered;
    } catch {
      return [];
    }
  }, []);

  const recordUsage = useCallback(() => {
    if (typeof window === 'undefined') return;
    const current = getUsage();
    current.push(Date.now());
    localStorage.setItem('callme-demo-usage', JSON.stringify(current));
  }, [getUsage]);

  // Handle gate form submission success
  useEffect(() => {
    if (state.succeeded && demoState === 'gate') {
      setSelectedIndustry(gateData.industry);
      setDemoState('ready');
    }
  }, [state.succeeded, demoState, gateData.industry]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Handle gate form change
  const handleGateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGateData(prev => ({ ...prev, [name]: value }));
    setGateError('');
  };

  // Handle gate form submit
  const handleGateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGateError('');
    setLimitError(null);

    // Bot check
    if (isBotSubmission(formStartTime.current)) {
      setGateError('Please take your time filling out the form.');
      return;
    }

    // Validate email
    const emailCheck = validateEmail(gateData.email);
    if (!emailCheck.isValid) {
      setGateError(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    // Validate phone
    const fullPhone = `${gateData.countryCode}${gateData.phone}`;
    const phoneCheck = validatePhone(fullPhone);
    if (!phoneCheck.isValid) {
      setGateError(phoneCheck.error || 'Please enter a valid phone number.');
      return;
    }

    // Submit to Formspree
    formspreeSubmit(e);
  };

  // End demo function (defined early so it can be used by startDemo)
  const endDemo = useCallback(() => {
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop Vapi call
    vapiRef.current?.stop();

    // Update state
    setDemoState('ended');
    setLiveTranscript(null);
  }, []);

  // Start demo
  const startDemo = () => {
    if (!selectedIndustry) return;
    
    const assistantId = getAssistantId(selectedIndustry);
    if (!assistantId) {
      setVapiError('Demo configuration error. Please try again later.');
      return;
    }

    // Rate limit check (skip if email is bypassed)
    if (!isEmailBypassed(gateData.email)) {
      const usage = getUsage();
      if (usage.length >= DEMO_LIMIT_COUNT) {
        setLimitError('Demo limit reached. You can start up to 2 demos every 7 days on this device.');
        return;
      }
      recordUsage();
    }

    setVapiError(null);
    setLimitError(null);
    setDemoState('in-demo');
    setTimeRemaining(DEMO_DURATION);
    setTranscripts([]);
    setLiveTranscript(null);

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up - end demo
          endDemo();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Trigger Vapi start once widget is mounted for the in-demo state
  useEffect(() => {
    if (demoState !== 'in-demo' || !selectedIndustry) return;

    const assistantId = getAssistantId(selectedIndustry);
    if (!assistantId) {
      setVapiError('Demo configuration error. Please try again later.');
      endDemo();
      return;
    }

    // vapiRef will be set after the VapiWidget renders in this state
    vapiRef.current?.start();
  }, [demoState, selectedIndustry, getAssistantId, endDemo]);

  // Handle Vapi call end (user hung up or call ended)
  const handleCallEnd = useCallback(() => {
    if (demoState === 'in-demo') {
      endDemo();
    }
  }, [demoState, endDemo]);

  // Handle Vapi error
  const handleVapiError = useCallback((error: string) => {
    setVapiError(error);
    endDemo();
  }, [endDemo]);

  // Keep transcript feed scrolled to latest entry
  useEffect(() => {
    if (transcriptFeedRef.current) {
      transcriptFeedRef.current.scrollTop = transcriptFeedRef.current.scrollHeight;
    }
  }, [transcripts, liveTranscript]);

  // Handle transcript streaming from Vapi
  const handleTranscript = useCallback((message: { role: 'assistant' | 'user'; transcript: string; transcriptType: 'partial' | 'final'; }) => {
    if (message.transcriptType === 'partial') {
      setLiveTranscript(`${message.role === 'assistant' ? 'Assistant' : 'You'}: ${message.transcript}`);
      return;
    }

    setLiveTranscript(null);
    setTranscripts(prev => [...prev, { role: message.role, text: message.transcript, id: prev.length + 1 }]);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Restart demo flow
  const restartDemo = () => {
    setDemoState('ready');
    setTimeRemaining(DEMO_DURATION);
    setVapiError(null);
    setLimitError(null);
  };

  return (
    <section className="callme-section">
      {/* Background */}
      <div className="callme-bg">
        <div className="callme-glow-orb callme-glow-1" />
        <div className="callme-glow-orb callme-glow-2" />
      </div>

      <div className="callme-container">
        {/* Header */}
        <div className="callme-header">
          <span className="callme-badge">
            <span className="callme-badge-dot" />
            Live Demo
          </span>
          <h1 className="callme-title">Try Matchbox live</h1>
          <p className="callme-subtitle">
            {demoState === 'gate' 
              ? 'Enter your details to access a 2-minute voice demo.'
              : 'Pick an industry and start a 2-minute demo.'}
          </p>
        </div>

        {/* Gate Form */}
        {demoState === 'gate' && (
          <div className="callme-gate-card">
            <h2 className="callme-gate-title">Get Access to Demo</h2>
            <form className="callme-gate-form" onSubmit={handleGateSubmit}>
              <input type="hidden" name="phone" value={`${gateData.countryCode}${gateData.phone}`} />
              <input type="hidden" name="source" value="call-me-demo-gate" />
              <input type="hidden" name="industry" value={gateData.industry} />

              <div className="callme-field">
                <label htmlFor="gate-email">Email</label>
                <input
                  id="gate-email"
                  name="email"
                  type="email"
                  value={gateData.email}
                  onChange={handleGateChange}
                  placeholder="you@company.com"
                  disabled={state.submitting}
                  required
                />
              </div>

              <div className="callme-field">
                <label htmlFor="gate-phone">Phone Number</label>
                <div className="callme-phone-group">
                  <input
                    list="gate-country-codes"
                    name="countryCode"
                    className="callme-country-select"
                    value={gateData.countryCode}
                    onChange={handleGateChange}
                    placeholder="+1"
                    disabled={state.submitting}
                  />
                  <datalist id="gate-country-codes">
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.dialCode}>
                        {country.name} {country.flag}
                      </option>
                    ))}
                  </datalist>
                  <input
                    id="gate-phone"
                    name="phone"
                    type="tel"
                    value={gateData.phone}
                    onChange={handleGateChange}
                    placeholder="(555) 123-4567"
                    disabled={state.submitting}
                    required
                  />
                </div>
              </div>

              <div className="callme-field">
                <label htmlFor="gate-industry">Industry</label>
                <select
                  id="gate-industry"
                  name="industry"
                  className="callme-select"
                  value={gateData.industry}
                  onChange={handleGateChange}
                  disabled={state.submitting}
                >
                  {INDUSTRIES.map(ind => (
                    <option key={ind.id} value={ind.id}>{ind.label}</option>
                  ))}
                </select>
              </div>

              {gateError && (
                <div className="callme-error">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  {gateError}
                </div>
              )}

              {state.errors && (
                <div className="callme-error">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  Something went wrong. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                className="callme-btn callme-btn-primary"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <>
                    <span className="callme-spinner" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Access Demo
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className="callme-disclaimer">
                Your information helps us personalize the demo. No spam, ever.
              </p>
            </form>
          </div>
        )}

        {/* Ready State - Industry Selection */}
        {demoState === 'ready' && (
          <div className="callme-demo-area">
            <div className="callme-industry-grid">
              {INDUSTRIES.map(ind => (
                <button
                  key={ind.id}
                  type="button"
                  className={`callme-industry-btn ${selectedIndustry === ind.id ? 'selected' : ''}`}
                  onClick={() => setSelectedIndustry(ind.id)}
                >
                  <div className="callme-industry-icon">{ind.icon}</div>
                  <div className="callme-industry-info">
                    <span className="callme-industry-label">{ind.label}</span>
                    <span className="callme-industry-desc">{ind.description}</span>
                  </div>
                </button>
              ))}
            </div>

            <button 
              type="button"
              className="callme-btn callme-btn-primary callme-start-btn"
              onClick={startDemo}
              disabled={!selectedIndustry}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Try Now
            </button>

            {vapiError && (
              <div className="callme-error callme-error-centered">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
                {vapiError}
              </div>
            )}
            {limitError && (
              <div className="callme-error callme-error-centered">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
                {limitError}
              </div>
            )}

            <div className="callme-instructions">
              <h3>How to get the best experience</h3>
              <div className="callme-instructions-list">
                <div className="callme-instruction">
                  <div className="callme-instruction-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <div className="callme-instruction-text">
                    <p className="callme-instruction-title">Allow mic & speakers</p>
                    <p>When prompted, allow browser access so you can talk and hear the AI.</p>
                  </div>
                </div>
                <div className="callme-instruction">
                  <div className="callme-instruction-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="callme-instruction-text">
                    <p className="callme-instruction-title">Speak like a real call</p>
                    <p>Just start talking naturally, as if you answered a customer call.</p>
                  </div>
                </div>
                <div className="callme-instruction">
                  <div className="callme-instruction-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 10h.01" />
                      <path d="M15 10h.01" />
                      <path d="M8 15c1.333 1 2.667 1 4 0" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <div className="callme-instruction-text">
                    <p className="callme-instruction-title">Try follow-ups</p>
                    <p>Ask questions, reschedule, or change details—the agent should keep up.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* In Demo State */}
        {demoState === 'in-demo' && (
          <div className="callme-demo-area">
            <div className="callme-in-demo">
              <div className="callme-demo-indicator">
                <div className="callme-pulse-ring" />
                <div className="callme-pulse-ring callme-pulse-ring-2" />
                <div className="callme-demo-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
              </div>
              
              <h2 className="callme-demo-status">In demo...</h2>
              
              <div className="callme-timer">
                <span className="callme-timer-value">{formatTime(timeRemaining)}</span>
                <span className="callme-timer-label">remaining</span>
              </div>

              <div className="callme-transcript-card">
                <div className="callme-transcript-header">
                  <div className="callme-transcript-status">
                    <span className="callme-transcript-dot" />
                    Live transcript
                  </div>
                  <span className="callme-transcript-hint">Watch the conversation as you speak</span>
                </div>
                <div className="callme-transcript-body">
                  {transcripts.length === 0 && !liveTranscript && (
                    <p className="callme-transcript-empty">Start talking and you will see the transcript here.</p>
                  )}
                  <div className="callme-transcript-feed" ref={transcriptFeedRef}>
                    {transcripts.map(item => (
                      <div key={item.id} className={`callme-transcript-line ${item.role === 'assistant' ? 'assistant' : 'user'}`}>
                        <span className="callme-transcript-label">{item.role === 'assistant' ? 'Assistant' : 'You'}</span>
                        <span className="callme-transcript-text">{item.text}</span>
                      </div>
                    ))}
                    {liveTranscript && (
                      <div className="callme-transcript-line live">
                        <span className="callme-transcript-label">Live</span>
                        <span className="callme-transcript-text">{liveTranscript}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button 
                type="button"
                className="callme-btn callme-btn-secondary callme-end-btn"
                onClick={endDemo}
              >
                End Demo
              </button>
            </div>

            {/* Vapi Widget Container */}
            {selectedIndustry && (
              <VapiWidget
                ref={vapiRef}
                assistantId={getAssistantId(selectedIndustry)}
                onCallEnd={handleCallEnd}
                onError={handleVapiError}
                onTranscript={handleTranscript}
              />
            )}
          </div>
        )}

        {/* Demo Ended State */}
        {demoState === 'ended' && (
          <div className="callme-demo-area">
            <div className="callme-ended">
              <div className="callme-ended-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              
              <h2 className="callme-ended-title">Demo ended</h2>
              <p className="callme-ended-text">
                Thanks for trying Matchbox! Ready for a deeper dive?
              </p>

              <div className="callme-post-demo">
                <h3 className="callme-post-title">Want a longer walkthrough?</h3>
                <a 
                  href="#" 
                  className="callme-btn callme-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    // Placeholder for future scheduling software link
                    // Update this href when scheduling software is integrated
                    alert('Scheduling integration coming soon!');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                  Book a Free Consultation
                </a>
                <p className="callme-post-note">
                  We'll show you exactly how Matchbox can work for your business.
                </p>
              </div>

              <button 
                type="button"
                className="callme-btn callme-btn-ghost"
                onClick={restartDemo}
              >
                Try another demo
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CallMe;
