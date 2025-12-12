const Services = () => {
  return (
    <div className="page">
      <h1>Our Services</h1>
      <div className="content">
        <div className="service-section">
          <h2>Web Development</h2>
          <p>
            We build modern, responsive web applications using React, TypeScript, and the latest 
            web technologies. Our solutions are scalable, maintainable, and performant.
          </p>
          <ul>
            <li>Single Page Applications (SPAs)</li>
            <li>Progressive Web Apps (PWAs)</li>
            <li>E-commerce solutions</li>
            <li>Custom web applications</li>
          </ul>
        </div>

        <div className="service-section">
          <h2>UI/UX Design</h2>
          <p>
            Our design team creates intuitive, beautiful interfaces that provide excellent 
            user experiences across all devices and platforms.
          </p>
          <ul>
            <li>User interface design</li>
            <li>User experience optimization</li>
            <li>Responsive design</li>
            <li>Design systems</li>
          </ul>
        </div>

        <div className="service-section">
          <h2>Technical Consulting</h2>
          <p>
            We provide expert guidance on technology decisions, architecture, and best practices 
            to help your business succeed in the digital world.
          </p>
          <ul>
            <li>Technology strategy</li>
            <li>Code reviews</li>
            <li>Performance optimization</li>
            <li>Team training</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;