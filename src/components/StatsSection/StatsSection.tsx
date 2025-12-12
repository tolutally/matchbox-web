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
          {/* Left - Image with stat overlay */}
          <div className="stats-image-card">
            <div className="image-gradient-overlay" />
            <div className="image-pattern">
              {/* Vertical lines pattern */}
              <div className="pattern-lines">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="pattern-line" style={{ animationDelay: `${i * 0.05}s` }} />
                ))}
              </div>
              {/* Diagonal light beam */}
              <div className="light-beam" />
            </div>
            <div className="image-stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Completed Deployments</span>
            </div>
          </div>

          {/* Right - Description and stats */}
          <div className="stats-content">
            <p className="stats-description">
              We build intelligent systems that help companies operate faster, automate
              safely, and scale to their full potential using AI-driven workflows.
            </p>

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

            <button className="stats-cta">
              Start with Matchbox
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
