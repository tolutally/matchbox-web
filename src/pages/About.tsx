import BackgroundLayer from "../components/BackgroundLayer";
import "./About.css";

export default function AboutPage(): JSX.Element {
  return (
    <div className="about-page">
      {/* Custom background */}
      <BackgroundLayer />

      {/* Overlay depth */}
      <div className="about-overlay" />

      {/* Main content */}
      <div className="about-content">
        {/* Header */}
        <header className="about-header">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            We build voice AI that businesses can actually rely on.
          </p>
          <p className="about-description">
            Matchbox is a voice AI agency focused on one thing: making high-volume conversations work better  without adding headcount, complexity, or risk.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Large feature cell */}
          <div className="bento-card bento-card-large">
            <h2>Our Mission</h2>
            <p className="highlight-text">
              Make voice the most reliable layer in modern operations.
            </p>
            <p>
              We exist to help businesses handle real conversations at scale. Not demos. Not scripts. Not gimmicks.
            </p>
            <p>
              Matchbox designs, deploys, and manages autonomous voice agents that answer calls, qualify intent, book outcomes, and follow up  consistently, 24/7.
            </p>
            <p className="highlight-text">
              Voice is your front line. We make sure it performs like one.
            </p>
            <button className="mission-button">
              Learn more about our approach 
            </button>
          </div>

          {/* Smaller cards */}
          <div className="bento-card bento-card-small">
            <h3>Our Team</h3>
            <p className="card-highlight">Operators, engineers, and problem-solvers.</p>
            <p>
              We're a multidisciplinary team with backgrounds in AI systems, operations, and customer experience. That means we don't just build voice agents  we make them work inside real businesses.
            </p>
          </div>

          <div className="bento-card bento-card-small">
            <h3>Our Process</h3>
            <p className="card-highlight">Design  deploy  optimize  own the outcome.</p>
            <p>
              We work hands-on with every deployment. From call flows and guardrails to integrations and tuning, Matchbox stays accountable for performance  not just setup.
            </p>
          </div>

          <div className="bento-card bento-card-small">
            <h3>Our Clients</h3>
            <p className="card-highlight">Any business where calls matter.</p>
            <p>
              From fast-growing startups to established enterprises, we work with teams that depend on voice to drive revenue, service, or coordination  across industries.
            </p>
          </div>

          <div className="bento-card bento-card-small">
            <h3>Our Impact</h3>
            <p className="card-highlight">Fewer missed calls. More completed conversations. Real results.</p>
            <p>
              Clients use Matchbox to reduce missed opportunities, improve response times, and turn inbound demand into predictable outcomes  without hiring more staff.
            </p>
          </div>

          <div className="bento-card bento-card-small">
            <h3>Our Vision</h3>
            <p className="card-highlight">When businesses think voice AI, they think Matchbox.</p>
            <p>
              We're building the default voice layer for modern organizations  trusted, flexible, and industry-agnostic. Not because it's trendy. Because it works.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
