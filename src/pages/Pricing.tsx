import { useState } from 'react';
import BackgroundLayer from '../components/BackgroundLayer';
import PricingCTA from '../components/PricingCTA';
import './Pricing.css';

type PlanType = 'inbound' | 'outbound';

interface PricingPlan {
  name: string;
  calls: string;
  price: string;
  overage: string;
  cta: string;
  footnote: string;
  idealFor: string;
  isCustom?: boolean;
  isPopular?: boolean;
}

interface Feature {
  title: string;
  price: string;
  description: string;
  details: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const inboundPlans: PricingPlan[] = [
  { 
    name: 'Starter', 
    calls: '50', 
    price: '$49.00 / month', 
    overage: '$1.20 / inbound call over 50', 
    cta: 'Get started', 
    footnote: '1 phone line included',
    idealFor: 'Small teams that miss calls during peak hours or after-hours.'
  },
  { 
    name: 'Growth', 
    calls: '150', 
    price: '$149.00 / month', 
    overage: '$1.10 / inbound call over 150', 
    cta: 'Get started', 
    footnote: '2 phone lines included', 
    idealFor: 'Businesses with steady inbound demand that need calls qualified and booked.',
    isPopular: true 
  },
  { 
    name: 'Pro', 
    calls: '500', 
    price: '$399.00 / month', 
    overage: '$0.99 / inbound call over 500', 
    cta: 'Get started', 
    footnote: '5 phone lines included',
    idealFor: 'High-volume inbound operations and multi-location teams.'
  },
  { 
    name: 'Enterprise', 
    calls: 'Custom', 
    price: 'Ask about enterprise pricing', 
    overage: '', 
    cta: 'Talk to us', 
    footnote: 'Price adjusted based on your needs', 
    idealFor: 'Large organizations with custom requirements and dedicated support needs.',
    isCustom: true 
  },
];

const outboundPlans: PricingPlan[] = [
  { 
    name: 'Starter', 
    calls: '50', 
    price: '$79.00 / month', 
    overage: '$1.40 / outbound call over 50', 
    cta: 'Get started', 
    footnote: 'Reminder & follow-up workflows included',
    idealFor: 'Basic reminders, confirmations, and no-show reduction.'
  },
  { 
    name: 'Growth', 
    calls: '200', 
    price: '$249.00 / month', 
    overage: '$1.20 / outbound call over 200', 
    cta: 'Get started', 
    footnote: '2 outbound workflows included', 
    idealFor: 'Regular follow-ups and customer check-ins at scale.',
    isPopular: true 
  },
  { 
    name: 'Pro', 
    calls: '600', 
    price: '$599.00 / month', 
    overage: '$0.99 / outbound call over 600', 
    cta: 'Get started', 
    footnote: 'Unlimited outbound workflows',
    idealFor: 'High-volume outbound programs and appointment-heavy teams',
  },
  { 
    name: 'Enterprise', 
    calls: 'Custom', 
    price: 'Ask about enterprise pricing', 
    overage: '', 
    cta: 'Talk to us', 
    footnote: 'Price adjusted based on your needs', 
    idealFor: 'Large organizations with custom requirements and dedicated support needs.',
    isCustom: true 
  },
];

const features: Feature[] = [
  {
    title: 'CRM Integrations',
    price: 'Included',
    description: 'Send call outcomes, summaries, and contact details to your CRM or Zapier.',
    details: 'Works with HubSpot, Salesforce, and more.',
  },
  {
    title: 'Lead Qualification',
    price: 'Included',
    description: 'Automatically capture intent, urgency, and key details based on your rules.',
    details: "Know who's worth following up — instantly.",
  },
  {
    title: 'Client Intake',
    price: 'Included',
    description: 'Ask up to 10 custom intake questions during the call so your team gets clean, usable data.',
    details: '',
  },
  {
    title: 'Call Transfers',
    price: 'Included',
    description: 'Route calls based on intent, urgency, or caller type.',
    details: 'Send the right calls to the right place, every time.',
  },
  {
    title: 'Live Agent Handoff',
    price: 'Optional',
    description: 'Bring in a human when needed — edge cases, high-value calls, or fail-safe coverage.',
    details: 'Available on demand.',
  },
  {
    title: 'Scheduling',
    price: 'Included',
    description: 'Book appointments directly into your calendar during the call.',
    details: 'Confirmation and reminders are handled automatically.',
  },
  {
    title: 'Dedicated Phone Numbers',
    price: 'Included',
    description: 'Get local or toll-free numbers, or port your existing business number at no extra cost.',
    details: '',
  },
  {
    title: 'Call Recording & Transcription',
    price: 'Included',
    description: 'Every call is recorded and transcribed with searchable history and admin controls.',
    details: '',
  },
  {
    title: 'Caller Q&A Handling',
    price: 'Included',
    description: 'Answer common questions automatically using your business rules and FAQs.',
    details: '',
  },
  {
    title: 'Instant Call Summaries',
    price: 'Included',
    description: 'Receive structured summaries via email, Slack, Teams, or CRM — immediately after each call.',
    details: '',
  },
];

const faqs: FAQ[] = [
  { question: 'Why does your AI answering service cost more than the competition?', answer: 'Our AI is built specifically for business calls with advanced features like live agent handoff, deep CRM integrations, and industry-specific training that cheaper alternatives simply cannot match.' },
  { question: 'Do you count spam calls towards my quota?', answer: 'No! We automatically detect and filter spam calls. They are not counted against your monthly call quota.' },
  { question: 'How do you determine if calls are spam?', answer: 'We use advanced AI detection combined with known spam number databases to identify and filter unwanted calls before they reach your receptionist.' },
  { question: 'Do I have to sign a contract?', answer: 'No contracts required. All plans are month-to-month and you can cancel anytime with no penalties.' },
  { question: 'Can I change my plan?', answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.' },
  { question: 'Why do you bill by the call?', answer: 'Billing by the call ensures you only pay for actual conversations. Quick hang-ups and spam calls don\'t count against your quota.' },
  { question: 'How is this worth it?', answer: 'Missing just one client call can cost you thousands in lost business. Our service ensures you never miss an opportunity, 24/7.' },
  { question: 'What is the money-back guarantee?', answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied, we\'ll refund your first month — no questions asked.' },
  { question: 'Do you offer discounted plans?', answer: 'Yes! We offer annual billing discounts and special rates for non-profits. Contact our sales team to learn more.' },
];

interface AddOn {
  name: string;
  price: string;
  comingSoon?: boolean;
}

const addOns: AddOn[] = [
  { name: 'Additional phone numbers', price: '$50/mo (up to 10)' },
  { name: 'CRM integration pack', price: '$99/mo' },
  { name: 'Custom voice persona', price: '$149/mo' },
  { name: 'Outbound campaign builder', price: '$199/mo', comingSoon: true },
];

const Pricing = () => {
  const [planType, setPlanType] = useState<PlanType>('inbound');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const currentPlans = planType === 'inbound' ? inboundPlans : outboundPlans;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pricing-page">
      <BackgroundLayer enableParticles={false} />
      
      {/* Header Section */}
      <section className="pricing-header">
        <div className="pricing-header-content">
          <h1 className="pricing-headline">
            The only voice AI you’ll trust  <span className="gradient-text">on your busiest days</span>
          </h1>
          <p className="pricing-subheadline">
            Handle inbound and outbound calls with <strong>AI-first voice agents</strong> that answer,
            qualify, schedule, and follow up - automatically, reliably, and at scale.
          </p>
          
          {/* Plan Type Toggle */}
          <div className="plan-toggle">
            <button
              className={`toggle-btn ${planType === 'inbound' ? 'active' : ''}`}
              onClick={() => setPlanType('inbound')}
            >
              <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Inbound
            </button>
            <button
              className={`toggle-btn ${planType === 'outbound' ? 'active' : ''}`}
              onClick={() => setPlanType('outbound')}
            >
              <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              Outbound
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="pricing-cards-section">
        <div className="pricing-cards-container">
          <div className="pricing-cards-grid">
            {currentPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
                {plan.isPopular && <span className="popular-badge">Most Popular</span>}
                <div className="pricing-card-content">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-calls">
                    <span className="calls-number">{plan.calls}</span>
                    {!plan.isCustom && <span className="calls-label">{planType === 'inbound' ? 'inbound calls' : 'outbound calls'}</span>}
                  </div>
                  <p className="plan-price">{plan.price}</p>
                  <p className="plan-ideal-for"><strong>Ideal for:</strong> {plan.idealFor}</p>
                </div>
                <div className="pricing-card-footer">
                  <button className="cta-button">{plan.cta}</button>
                  {plan.overage && <p className="overage-text">Overage: {plan.overage}</p>}
                  <p className="footnote-text">{plan.footnote}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Plan Benefits */}
          <div className="plan-benefits">
            <h4 className="benefits-title">All plans include a 30-day money-back guarantee, plus:</h4>
            <div className="benefits-list">
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Call screening, qualification & intake</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>AI-first coverage with optional human escalation</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Call recordings, transcripts & summaries</span>
              </div>
            </div>
            <div className="no-fees-list">
              <div className="no-fee-item">
                <svg className="block-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                <span>No setup fees</span>
              </div>
              <div className="no-fee-item">
                <svg className="block-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                <span>No annual contracts</span>
              </div>
              <div className="no-fee-item">
                <svg className="block-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                <span>No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-headline">What's in the box?</h2>
          <p className="features-subheadline">
            Everything you need to run voice operations — included in every plan.
          </p>
          <h3 className="features-label">Included features</h3>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-header">
                  <h4 className="feature-title">{feature.title}</h4>
                  <span className={`feature-price ${feature.price === 'Optional' ? 'optional' : ''}`}>{feature.price}</span>
                </div>
                <p className="feature-description">{feature.description}</p>
                {feature.details && <p className="feature-details">{feature.details}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="addons-section">
        <div className="addons-container">
          <h2 className="addons-headline">Optional add-ons</h2>
          <p className="addons-subheadline">Enhance your plan with powerful extras</p>
          
          <div className="addons-grid">
            {addOns.map((addon, index) => (
              <div key={index} className="addon-card">
                <div className="addon-content">
                  <h4 className="addon-name">
                    {addon.name}
                    {addon.comingSoon && <span className="coming-soon-badge">Coming soon</span>}
                  </h4>
                  <span className="addon-price">{addon.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA Section */}
      <section className="pricing-cta-section">
        <div className="pricing-cta-container">
          <PricingCTA 
            imageSrc="/matchbox-preview.png"
            imageAlt="Matchbox voice agent preview"
          />
        </div>
      </section>

      {/* Testimonial Section - Temporarily disabled */}
      {/* <section className="testimonial-section">
        <div className="testimonial-container">
          <h2 className="testimonial-headline">Matchbox is trusted by 100+ businesses</h2>
          
          <div className="ratings-row">
            <div className="rating-item">
              <span className="rating-name">Clutch</span>
              <div className="stars">★★★★★</div>
              <span className="rating-score">4.8 stars</span>
            </div>
            <div className="rating-item">
              <span className="rating-name">G2</span>
              <div className="stars">★★★★★</div>
              <span className="rating-score">4.9 stars</span>
            </div>
            <div className="rating-item">
              <span className="rating-name">Capterra</span>
              <div className="stars">★★★★★</div>
              <span className="rating-score">4.8 stars</span>
            </div>
            <div className="rating-item">
              <span className="rating-name">Trustpilot</span>
              <div className="stars stars-green">★★★★★</div>
              <span className="rating-score">4.5 stars</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <h3 className="testimonial-title">Converts callers into clients</h3>
            <p className="testimonial-text">
              Matchbox is our inbound sales team. Having a trained and personable voice has transformed our ability to answer the phone and convert callers to clients.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <span>JT</span>
              </div>
              <div className="author-info">
                <p className="author-name">Jeremy Treister</p>
                <p className="author-title">Owner, CMIT Solutions of Downtown Chicago</p>
              </div>
            </div>
            <a href="#" className="case-study-link">Read case study ›</a>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-headline">Frequently asked questions</h2>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`faq-icon ${openFaqIndex === index ? 'open' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                {openFaqIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
