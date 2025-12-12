import './OutcomeSection.css';

const OutcomeSection = () => {
  return (
    <section id="features" className="outcome-section">
      <div className="outcome-container">
        {/* Heading */}
        <div className="outcome-header">
          <h2 className="outcome-title">
            Architected for precision.
          </h2>
          <p className="outcome-subtitle">
            Unlike generic phone trees, Matchbox voice agents understand context,
            follow your booking rules, and keep every caller on a clean,
            reliable path from call → appointment → reminder.
          </p>
        </div>

        <div className="outcome-grid">
          {/* Large Card – Context-Aware Call Engine */}
          <div className="outcome-card large">
            <div className="card-bg-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <rect width="6" height="6" x="16" y="16" rx="1" />
                <rect width="6" height="6" x="2" y="16" rx="1" />
                <rect width="6" height="6" x="9" y="2" rx="1" />
                <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3m-7-4V8" />
              </svg>
            </div>

            <div className="card-content">
              <div className="card-icon sky">
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
                  <path d="M12 20v2m0-20v2m5 16v2m0-20v2M2 12h2m-2 5h2M2 7h2m16 5h2m-2 5h2M20 7h2M7 20v2M7 2v2" />
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <rect width="8" height="8" x="8" y="8" rx="1" />
                </svg>
              </div>

              <h3 className="card-title">
                Context-Aware Call Engine
              </h3>
              <p className="card-description">
                Matchbox listens like your best front-desk staff — applying your
                intake rules, clinic/service policies, and availability logic in
                real time so every call ends in a clean, correct booking.
              </p>

              <div className="feature-checklist">
                <div className="checklist-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="check-icon"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11l3 3L22 4" />
                  </svg>
                  Caller + history aware
                </div>

                <div className="checklist-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="check-icon"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11l3 3L22 4" />
                  </svg>
                  Booking & triage rules applied
                </div>

                <div className="checklist-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="check-icon"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11l3 3L22 4" />
                  </svg>
                  Spoken details read back + confirmed
                </div>

                <div className="checklist-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="check-icon"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11l3 3L22 4" />
                  </svg>
                  Logs straight into your tools
                </div>
              </div>
            </div>
          </div>

          {/* Tall Card – Handles every spike */}
          <div className="outcome-card tall">
            <div className="card-icon orange">
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
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
            </div>

            <h3 className="card-title">
              Built for peak hours & overflow
            </h3>
            <p className="card-description">
              Lunch rush, storm season, Monday mornings — Matchbox scales up
              instantly so you never miss a call, even when the phone won't
              stop ringing.
            </p>

            <div className="card-gradient orange" />

            <div className="bar-chart">
              <div className="bar bar-1" />
              <div className="bar bar-2" />
              <div className="bar bar-3" />
              <div className="bar bar-4 active" />
            </div>
          </div>

          {/* Small Card – Guardrails */}
          <div className="outcome-card">
            <div className="card-icon blue">
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
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12l2 2l4-4" />
              </svg>
            </div>

            <h3 className="card-title">
              Guardrails & compliance baked in
            </h3>
            <p className="card-description">
              Recordings, transcripts, escalation rules and safe-phrase filters
              keep calls on-script, auditable, and aligned with your clinic or
              service policies.
            </p>
          </div>

          {/* Wide Card – End-to-End Workflow */}
          <div className="outcome-card wide">
            <div className="card-content-row">
              <div className="card-text">
                <div className="card-icon emerald">
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
                    <rect width="8" height="8" x="3" y="3" rx="2" />
                    <path d="M7 11v4a2 2 0 0 0 2 2h4" />
                    <rect width="8" height="8" x="13" y="13" rx="2" />
                  </svg>
                </div>

                <h3 className="card-title">
                  End-to-end call workflow
                </h3>
                <p className="card-description">
                  Matchbox handles the full journey: answers the call, books the
                  slot, sends reminders, and triggers follow-ups — so your team
                  just shows up and does the work.
                </p>
              </div>

              {/* Mini flow UI: Call → Appointment → Reminder */}
              <div className="workflow-diagram">
                <div className="workflow-box">
                  {/* Incoming call */}
                  <div className="workflow-step">
                    <div className="step-icon emerald">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18A2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.37 1.7.72 2.49l-.88.88a2 2 0 0 0-.46 2.11a13 13 0 0 0 2.57 4.11a13 13 0 0 0 4.11 2.57a2 2 0 0 0 2.11-.46l.88-.88c.79.35 1.63.6 2.49.72A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </div>
                    <div className="step-line" />
                  </div>

                  {/* Connector */}
                  <div className="workflow-connector">
                    <div className="connector-line" />
                  </div>

                  {/* Appointment booked */}
                  <div className="workflow-step">
                    <div className="step-icon blue-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M8 2v4m8-4v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18M9 16l2 2l4-4" />
                      </svg>
                    </div>
                    <div className="step-line" />
                  </div>

                  {/* Connector */}
                  <div className="workflow-connector">
                    <div className="connector-line" />
                  </div>

                  {/* Reminder sent */}
                  <div className="workflow-step">
                    <div className="step-icon slate">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719" />
                      </svg>
                    </div>
                    <div className="step-line" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;
