import { useState, useEffect, useRef } from 'react';
import './TestimonialsSection.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    role: 'CTO',
    company: 'NEXUS HEALTH',
    quote:
      '"Matchbox cut our call handling time by 80%. It\'s not just automation; it\'s intelligent routing that feels indistinguishable from our best front-desk staff."',
    avatar: 'ER',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Operations Director',
    company: 'BRIGHTSIDE DENTAL',
    quote:
      '"We went from missing 40% of calls to capturing every single one. Our no-show rate dropped by 60% thanks to the automated reminders."',
    avatar: 'MC',
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'Practice Manager',
    company: 'PRIMECARE PHYSIO',
    quote:
      '"The AI handles appointment bookings exactly like we would. Patients don\'t even realize they\'re talking to an AI until we tell them."',
    avatar: 'ST',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Owner',
    company: '24/7 PLUMBING CO',
    quote:
      '"During storm season, we used to lose hundreds of calls. Now Matchbox handles the overflow seamlessly—bookings went up 3x."',
    avatar: 'JW',
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardsContainerRef.current) return;

      const container = cardsContainerRef.current;
      const cards = container.querySelectorAll('.testimonial-card');
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const container = cardsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="testimonials-container">
        {/* Left Content */}
        <div className="testimonials-left">
          <span className="testimonials-label">TESTIMONIALS</span>
          <h2 className="testimonials-title">
            What Our <span className="highlight">Clients Say</span>
          </h2>
          <p className="testimonials-tagline">Real teams. Real outcomes.</p>
          <p className="testimonials-description">
            Matchbox helps clinics, service teams, and businesses handle calls
            faster than they thought possible. Join 500+ companies building the
            future.
          </p>

          <button className="testimonials-cta">
            Explore Case Studies
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

          <div className="testimonials-social-proof">
            <div className="avatar-stack">
              {testimonials.slice(0, 3).map((t, i) => (
                <div
                  key={t.id}
                  className="avatar-circle"
                  style={{ zIndex: 3 - i }}
                >
                  {t.avatar}
                </div>
              ))}
              <div className="avatar-count">+2k</div>
            </div>
            <div className="rating-text">
              <span className="rating-number">4.9/5</span> rating from verified
              users
            </div>
          </div>
        </div>

        {/* Right - Scrolling Testimonials */}
        <div className="testimonials-right">
          <div className="testimonials-cards" ref={cardsContainerRef}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
              >
                <div className="card-header">
                  <div className="card-avatar">{testimonial.avatar}</div>
                  <div className="card-info">
                    <span className="card-name">{testimonial.name}</span>
                    <span className="card-role">
                      {testimonial.role} AT {testimonial.company}
                    </span>
                  </div>
                  <div className="card-quote-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.3 8.1H6.7c-.4 0-.7.3-.7.7v4.5c0 .4.3.7.7.7h3.3c.4 0 .7.3.7.7v.5c0 1.7-1.3 3-3 3h-.3c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h.3c3.1 0 5.7-2.6 5.7-5.7V8.8c0-.4-.3-.7-.7-.7h-1.4zm9 0h-4.6c-.4 0-.7.3-.7.7v4.5c0 .4.3.7.7.7h3.3c.4 0 .7.3.7.7v.5c0 1.7-1.3 3-3 3h-.3c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h.3c3.1 0 5.7-2.6 5.7-5.7V8.8c0-.4-.3-.7-.7-.7h-1.4z" />
                    </svg>
                  </div>
                </div>
                <p className="card-quote">{testimonial.quote}</p>
              </div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="scroll-indicators">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`scroll-dot ${index === activeIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
