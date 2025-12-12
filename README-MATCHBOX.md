# Matchbox Website

A modern, responsive website built with React, TypeScript, and Vite. This project showcases a clean, modular architecture with well-organized components and pages.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Modular Architecture**: Well-organized folder structure
- **Component-Based**: Reusable UI components
- **Type Safety**: Full TypeScript support
- **Fast Development**: Vite's lightning-fast HMR

## 📁 Project Structure

```
src/
├── pages/           # Page components (Home, About, Services, Contact)
├── components/      # Reusable UI components (Header, Footer)
├── layouts/         # Layout components (MainLayout)
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── styles/         # Global styles and CSS modules
└── assets/         # Static assets
```

## 🛠️ Setup & Installation

1. **Prerequisites**: Ensure you have Node.js 18+ installed

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Current Pages

- **Home** - Landing page with hero section and services overview
- **About** - Company information and values
- **Services** - Detailed service offerings
- **Contact** - Contact form and company details

## 🔄 Navigation

The website currently uses a simple state-based navigation system. To add React Router:

1. Install React Router:
   ```bash
   npm install react-router-dom
   ```

2. Update `App.tsx` to use React Router components
3. Replace navigation logic in `Header.tsx`

## 💻 Development Guidelines

- Use functional components with hooks
- Follow TypeScript best practices
- Keep components small and focused
- Use CSS modules for component-specific styles
- Maintain consistent naming conventions

## 🎯 Next Steps

- [ ] Add React Router for proper routing
- [ ] Implement dark mode toggle
- [ ] Add animations and transitions
- [ ] Create more reusable components
- [ ] Add form validation
- [ ] Implement responsive navigation menu

## 🚀 Getting Started

The TypeScript errors have been resolved and the project is ready to run. If you encounter PowerShell execution policy issues, you can:

1. Set execution policy: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
2. Or use VS Code's terminal with the dev task
3. Or run commands directly in Command Prompt instead of PowerShell