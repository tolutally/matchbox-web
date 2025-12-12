import './MatchboxUiMockupSection.css';

const MatchboxUiMockupSection = () => {
  return (
    <section className="mockup-section">
      <div className="mockup-container">
        <div className="mockup-window">
          {/* Glossy reflection top */}
          <div className="mockup-reflection" />

          {/* Window Controls */}
          <div className="window-controls">
            <div className="window-dot red" />
            <div className="window-dot yellow" />
            <div className="window-dot green" />

            <div className="url-bar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              app.matchboxlab.xyz
            </div>
          </div>

          <div className="window-content">
            {/* Sidebar */}
            <div className="sidebar">
              <div className="sidebar-section-title">VOICE AGENTS</div>
              <div className="sidebar-items">
                <div className="sidebar-item active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  Front Desk Agent
                </div>

                <div className="sidebar-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M18 8a3 3 0 0 1 0 6" />
                    <path d="M10 19v-3.5l-2-2V11a4 4 0 0 1 8 0v2.5l-2 2V19" />
                    <path d="M8 8a3 3 0 0 1 6 0" />
                  </svg>
                  Reminder Agent
                </div>

                <div className="sidebar-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M4 4h16v4H4z" />
                    <path d="M4 12h8v8H4z" />
                    <path d="M16 12h4v8h-4z" />
                  </svg>
                  Follow-up Agent
                </div>
              </div>

              <div className="sidebar-section-title">OPERATIONS</div>
              <div className="sidebar-items">
                <div className="sidebar-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
                  </svg>
                  Call Overview
                </div>
                <div className="sidebar-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 7h8M8 12h5M8 17h3" />
                  </svg>
                  Appointment Pipeline
                </div>
              </div>

              <div className="sidebar-usage">
                <div className="usage-header">
                  <span className="usage-label">Call minutes used</span>
                  <span className="usage-value">68%</span>
                </div>
                <div className="usage-bar">
                  <div className="usage-bar-fill" style={{ width: '68%' }} />
                </div>
                <div className="usage-reset">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                  Resets in 3d
                </div>
              </div>
            </div>

            {/* Main Dashboard */}
            <div className="dashboard">
              {/* Header */}
              <div className="dashboard-header">
                <div>
                  <h3 className="dashboard-title">Today's Call Flow</h3>
                  <p className="dashboard-subtitle">From first ring to confirmed appointment and reminders.</p>
                </div>
                <div className="dashboard-filters">
                  <span className="filter-btn">Last 24h</span>
                  <span className="filter-btn live">
                    <span className="live-dot">
                      <span className="live-dot-ping" />
                      <span className="live-dot-solid" />
                    </span>
                    Live
                  </span>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="kpi-grid">
                {/* Card 1 - Calls Answered */}
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Calls Answered</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="kpi-icon">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </div>
                  <div className="kpi-value">132</div>
                  <div className="kpi-change positive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 7h6v6" />
                      <path d="m22 7-8.5 8.5-5-5L2 17" />
                    </svg>
                    +14.5% vs yesterday
                  </div>
                </div>

                {/* Card 2 - Appointments Booked (Active) */}
                <div className="kpi-card highlighted">
                  <div className="kpi-card-glow" />
                  <div className="kpi-header">
                    <span className="kpi-label">Appointments Booked</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="kpi-icon highlight">
                      <path d="M8 2v4m8-4v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18M9 16l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="kpi-value">47</div>
                  <div className="kpi-change highlight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 7h6v6" />
                      <path d="m22 7-8.5 8.5-5-5L2 17" />
                    </svg>
                    1 in 3 calls → booking
                  </div>
                </div>

                {/* Card 3 - Reminders Sent */}
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Reminders Sent</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="kpi-icon">
                      <path d="m3 3 3 1 3-1 3 1 3-1 3 1v13l-3-1-3 1-3-1-3 1-3-1z" />
                      <path d="M9 8h6" />
                      <path d="M9 12h3" />
                    </svg>
                  </div>
                  <div className="kpi-value">89</div>
                  <div className="kpi-change positive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 7h6v6" />
                      <path d="m22 7-8.5 8.5-5-5L2 17" />
                    </svg>
                    92% show-up rate
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="activity-feed">
                <div className="feed-header">
                  <span className="feed-title">Live Call Feed</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feed-icon">
                    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                  </svg>
                </div>
                <div className="feed-items">
                  {/* Event 1 */}
                  <div className="feed-item">
                    <div className="feed-item-icon sky">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </div>
                    <div className="feed-item-content">
                      <div className="feed-item-title">
                        <span className="highlight-text sky">Front Desk Agent</span> answered an inbound call
                      </div>
                      <div className="feed-item-desc">
                        Caller: Julia M. (new patient) — asking for an evening slot.
                      </div>
                    </div>
                    <div className="feed-item-time">Just now</div>
                  </div>

                  {/* Event 2 */}
                  <div className="feed-item">
                    <div className="feed-item-icon blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M8 2v4m8-4v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                      </svg>
                    </div>
                    <div className="feed-item-content">
                      <div className="feed-item-title">
                        <span className="highlight-text blue">Booking Engine</span> scheduled an appointment
                      </div>
                      <div className="feed-item-desc">
                        Julia M. booked for <strong>Today · 6:30 PM</strong> with Dr. Laniyi.
                      </div>
                    </div>
                    <div className="feed-item-time">3m ago</div>
                  </div>

                  {/* Event 3 */}
                  <div className="feed-item faded">
                    <div className="feed-item-icon emerald">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="m4 7 8 6 8-6" />
                      </svg>
                    </div>
                    <div className="feed-item-content">
                      <div className="feed-item-title">
                        <span className="highlight-text emerald">Reminder Agent</span> sent SMS + email reminders
                      </div>
                      <div className="feed-item-desc">
                        24-hour and 2-hour reminders scheduled for all appointments tomorrow.
                      </div>
                    </div>
                    <div className="feed-item-time">12m ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glow under dashboard */}
        <div className="mockup-glow" />
      </div>
    </section>
  );
};

export default MatchboxUiMockupSection;
