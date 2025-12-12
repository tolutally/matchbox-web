import { useEffect } from "react";
import "./BackgroundLayer.css";

interface BackgroundLayerProps {
  /**
   * Enable particle starfield background.
   * Requires particles.js to be loaded globally.
   */
  enableParticles?: boolean;
}

// Extend window type for particles.js
declare global {
  interface Window {
    particlesJS?: (elementId: string, config: object) => void;
  }
}

const BackgroundLayer = ({ enableParticles = false }: BackgroundLayerProps) => {
  useEffect(() => {
    if (!enableParticles) return;

    // Wait for particles.js to be available
    const initParticles = () => {
      const particlesJS = window.particlesJS;
      if (!particlesJS) {
        console.log("Waiting for particles.js to load...");
        // Retry after a short delay if not loaded yet
        setTimeout(initParticles, 200);
        return;
      }

      console.log("Initializing particles.js...");
      
      particlesJS("particles-js", {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.8, random: true },
          size: { value: 2, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#7dd3fc",
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
      
      console.log("Particles.js initialized!");
    };

    // Small delay to ensure DOM is ready
    setTimeout(initParticles, 100);
  }, [enableParticles]);

  return (
    <>
      {/* Particles layer */}
      {enableParticles && (
        <div className="particles-wrapper">
          <div id="particles-js" />
        </div>
      )}

      {/* Ambient grid + blobs */}
      <div className="ambient-background">
        {/* Subtle grid */}
        <div className="bg-grid" />

        {/* Top glow */}
        <div className="glow-top" />

        {/* Bottom-right glow */}
        <div className="glow-bottom-right" />
      </div>
    </>
  );
};

export default BackgroundLayer;
