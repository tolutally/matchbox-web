import './StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {/* Heading */}
        <h2 className="stats-heading">
          From <span className="highlight">intelligent voice agents</span> to cutting-edge AI,{' '}
          <em>our solutions unlock tomorrow.</em>
        </h2>

        {/* Content Grid */}
        <div className="stats-grid">
          {/* Left - Image (65%) */}
          <div className="stats-image-card">
            <img 
              src="/voice-interaction-hero.png" 
              alt="Professional using Matchbox voice AI on phone"
              className="stats-hero-image"
            />
            
            {/* Vignette / depth overlays */}
            <div className="image-vignette-left" />
            <div className="image-glow-indigo" />
            <div className="image-glow-cyan" />

            {/* Chat overlays */}
            <div className="image-overlays">
              {/* Left overlay stack */}
              <div className="chat-stack">
                {/* Customer message */}
                <div className="chat-bubble chat-bubble-customer">
                  <div className="chat-bubble-inner">
                    <div className="chat-avatar chat-avatar-customer">
                      <svg viewBox="0 0 24 24" fill="none" className="chat-icon">
                        <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="chat-content">
                      <div className="chat-header">
                        <span className="chat-name">Caller</span>
                        <span className="chat-time">15:41</span>
                      </div>
                      <p className="chat-message">Hi — I need to reschedule my appointment.</p>
                      <div className="voice-indicator">
                        <span className="voice-dot" />
                        <div className="voice-bars">
                          <span className="voice-bar" style={{ height: '8px' }} />
                          <span className="voice-bar" style={{ height: '12px' }} />
                          <span className="voice-bar" style={{ height: '16px' }} />
                          <span className="voice-bar" style={{ height: '8px' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-highlight" />
                </div>

                {/* Matchbox Agent message */}
                <div className="chat-bubble chat-bubble-agent">
                  <div className="chat-bubble-inner">
                    <div className="chat-avatar chat-avatar-agent">
                      <svg viewBox="0 0 24 24" fill="none" className="chat-icon">
                        <path d="M12 4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <rect x="4" y="7" width="16" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12h.01M16 12h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        <path d="M7 20v1M17 20v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="chat-content">
                      <div className="chat-header">
                        <span className="chat-name">Matchbox Agent</span>
                        <span className="chat-time">15:41</span>
                      </div>
                      <p className="chat-message">No problem. I can help with that. What day works best for you?</p>
                    </div>
                  </div>
                  <div className="chat-highlight" />
                </div>

                {/* Booking card */}
                <div className="booking-card">
                  <div className="booking-glow" />
                  <p className="booking-title">Choose a time that works</p>
                  <div className="booking-inputs">
                    <div className="booking-input">
                      <span className="booking-label">Date</span>
                      <div className="booking-value">
                        <svg viewBox="0 0 24 24" fill="none" className="booking-icon">
                          <path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
                          <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span>Oct 16, 2025</span>
                      </div>
                    </div>
                    <div className="booking-input">
                      <span className="booking-label">Time</span>
                      <div className="booking-value">
                        <svg viewBox="0 0 24 24" fill="none" className="booking-icon">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>7:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <button className="booking-confirm">Confirm</button>
                  <p className="booking-note">Matchbox sends confirmation + reminders automatically.</p>
                </div>
              </div>

              {/* Bottom right badge */}
              <div className="live-badge">
                <div className="live-badge-inner">
                  <div className="live-badge-header">
                    <span className="live-dot" />
                    <span className="live-text">Live: calls answered in &lt; 2s</span>
                  </div>
                  <p className="live-subtext">Qualify • Book • Follow up</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content (35%) */}
          <div className="stats-content">
            <p className="stats-description">
              We build intelligent systems that help companies operate faster, automate
              safely, and scale to their full potential using AI-driven workflows.
            </p>

            {/* Deployment and success rate cards - side by side */}
            <div className="deployment-cards-row">
              <div className="deployment-stat-card">
                <span className="deployment-number">100+</span>
                <span className="deployment-label">Completed Deployments</span>
              </div>
              <div className="deployment-stat-card">
                <span className="deployment-number">93%</span>
                <span className="deployment-label">Call Success Rate</span>
              </div>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <span className="stat-card-number">8100+</span>
                <span className="stat-card-label">Outbound Calls Handled</span>
              </div>
              <div className="stat-card">
                <span className="stat-card-number">37+</span>
                <span className="stat-card-label">Staff hours saved every week</span>
              </div>
            </div>

            <div className="stats-cta-wrapper">
              <button className="stats-cta">
                Start with Matchbox
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
