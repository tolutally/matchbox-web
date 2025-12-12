# Matchbox Website

A modern, responsive website for Matchbox - an AI-powered healthcare communication platform that handles high call volumes with autonomous voice agents.

## 🚀 Features

- **AI Voice Agents** - Automated call handling for bookings, reminders, and follow-ups
- **Healthcare-Focused** - Built specifically for clinics, hospitals, and healthcare providers
- **24/7 Operations** - Autonomous systems that work around the clock
- **HIPAA-Ready Security** - Healthcare-grade privacy and data protection

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS Modules** - Scoped styling with glass morphism effects
- **Particles.js** - Animated starfield background

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BackgroundLayer/ # Particles.js starfield background
│   ├── Header/          # Navigation header with logo
│   ├── Footer/          # Site footer with newsletter
│   ├── HeroSection/     # Landing hero with CTAs
│   ├── MatchboxUiMockupSection/ # Dashboard UI preview
│   ├── StatsSection/    # Animated stats display
│   ├── OutcomeSection/  # Feature cards
│   ├── ProcessSection/  # Interactive 4-step process
│   ├── TestimonialsSection/ # Customer testimonials
│   └── SecuritySection/ # Privacy & security features
├── contexts/            # React context providers
│   └── NavigationContext.tsx # App-wide navigation state
├── layouts/             # Page layout components
│   └── MainLayout.tsx   # Main page wrapper
├── pages/               # Page components
│   ├── Home.tsx         # Homepage
│   ├── About.tsx        # About page
│   ├── Services.tsx     # Services page
│   └── Contact.tsx      # Contact form page
├── styles/              # Global styles
└── App.tsx              # Main app component
```

## 🎨 Design System

- **Colors**:
  - Primary: Sky Blue (`#38bdf8`, `#7dd3fc`, `#0ea5e9`)
  - Accent: Orange (`#f76033`)
  - Background: Slate-950 (`#030712`)
- **Typography**: Inter font family
- **Effects**: Glass morphism, backdrop blur, gradient glows

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 Pages

- **Home** - Landing page with hero, stats, features, process, testimonials, and security sections
- **About** - Company information
- **Services** - Service offerings
- **Contact** - Contact form with background image and info cards

## 🔗 Navigation

The app uses a React Context-based navigation system. All "Contact Us" and "Get Started" buttons navigate to the Contact page.

## 📱 Responsive Design

Fully responsive design that works on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## 📝 License

© 2025 Matchbox Digital Technologies Ltd. All rights reserved.
