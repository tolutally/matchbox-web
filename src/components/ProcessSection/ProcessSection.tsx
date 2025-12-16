import { useState } from 'react';
import './ProcessSection.css';
import { useNavigation } from '../../contexts/NavigationContext';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Discovery & Alignment',
    description:
      'We start by understanding your call volume, workflows, and constraints. Together we identify the highest-impact opportunities where AI voice agents can move the needle for your team.',
  },
  {
    id: 2,
    title: 'Design the Right Solution',
    description:
      'We design a tailored strategy - voice agent scripts, booking logic, or reminder flows, mapping caller journeys, integration points, and guardrails around your existing stack.',
  },
  {
    id: 3,
    title: 'Build, Test & Refine',
    description:
      'We develop your AI voice workflows, plug into your tools, and iterate quickly with real calls. Each cycle improves speed, reliability, and quality of outcomes.',
  },
  {
    id: 4,
    title: 'Launch, Learn, and Optimize',
    description:
      'Once live, we monitor adoption and impact. From there we refine prompts, call flows, and logic so your AI system keeps getting smarter and your team keeps getting faster.',
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { navigate } = useNavigation();

  const currentStep = processSteps.find((step) => step.id === activeStep);

  return (
    <section className="process-section">
      <div className="process-container">
        {/* Header */}
        <div className="process-header">
          <div className="process-label">
            <span className="label-line" />
            <span className="label-text">PROCESS</span>
          </div>
          <h2 className="process-title">
            How We <span className="highlight">Work</span> From idea to launch.
          </h2>
          <p className="process-subtitle">
            Our workflow is clear, collaborative, and engineered to ship
            production-ready AI systems in weeks, and not months.
          </p>
        </div>

        {/* Step Selector */}
        <div className="step-selector">
          {processSteps.map((step, index) => (
            <div key={step.id} className="step-item">
              <button
                className={`step-button ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                {String(step.id).padStart(2, '0')}
              </button>
              {index < processSteps.length - 1 && (
                <div
                  className={`step-connector ${activeStep > step.id ? 'completed' : ''}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content Card */}
        <div className="step-content-card">
          <div className="current-phase-badge">
            <span className="phase-dot" />
            <span className="phase-text">CURRENT PHASE</span>
          </div>
          <h3 className="step-title">{currentStep?.title}</h3>
          <p className="step-description">{currentStep?.description}</p>
          <button className="process-cta" onClick={() => navigate('contact')}>
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
