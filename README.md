# Personal Portfolio (React + Vite + MUI + Tailwind)

A modern, single-page personal portfolio website built with React (Vite), Tailwind CSS, Material UI, Framer Motion, and react-scroll. Includes smooth scrolling, animated sections, responsive layout, EmailJS-powered contact form, and a sticky navigation bar that highlights the active section.

## ✨ Features
- Sticky navbar with active link highlighting
- Smooth scrolling between sections
- Loader screen with neon cyan design
- Animated entrances (Framer Motion + AOS)
- Responsive design (desktop/mobile)
- Projects grid with MUI Cards
- Services cards, About section, Contact form (EmailJS)
- Footer with navigation and social links

## 🧰 Tech Stack
- React (Vite, TypeScript)
- Tailwind CSS
- Material UI (MUI)
- Framer Motion
- react-scroll
- AOS (Animate On Scroll)
- EmailJS (@emailjs/browser)
- react-icons / MUI Icons

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18 and npm

### Install
```bash
# from project root
cd "Potfolio"
npm install
```

### Development
```bash
npm run dev
```
Vite will print a local URL (typically http://localhost:5173).

### Build
```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Tailwind
Tailwind is already configured. Global utility helpers are in `src/index.css` (e.g., `container-pad`, `section-title`, `card-base`). Theme accents are defined in `tailwind.config.js` under `colors.accent`.

### Contact Form (Nodemailer + Vercel Serverless)
The contact form uses a Vercel serverless function with Nodemailer to send emails via Gmail.

**Setup for Vercel Deployment:**

1. **Generate Gmail App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Create a new app password for "Mail"
   - Copy the 16-character password

2. **Add Environment Variables in Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add these variables:
     - `GMAIL_USER` = your-email@gmail.com
     - `GMAIL_PASS` = your-16-char-app-password
   - Make sure to add them for Production, Preview, and Development

3. **Redeploy:**
   - After adding environment variables, redeploy your project
   - The contact form will now work!

### Personalization
- Update your name in Loader, Home headline, and Footer (`src/App.tsx`).
- Replace social links (GitHub, LinkedIn, Instagram) in Home and Footer.
- Swap project images and content in the `Projects` section (currently using placeholder images from `picsum.photos`).
- Update contact details in the `Contact` section.

## 📁 Project Structure
```
Potfolio/
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ src/
│  ├─ App.tsx            # All sections & layout (SPA)
│  ├─ index.css          # Tailwind layers + helpers
│  ├─ main.tsx           # App bootstrap
│  └─ ...
└─ public/
```

## 🧭 Sections
- Loader
- Home
- About
- Projects
- Services
- Contact
- Footer

## 🪄 Design Notes
- Minimal, clean, lots of white space
- Black/white primary palette with cyan/indigo accents
- Smooth hover states on buttons and cards
- Rounded corners and soft shadows

## 📦 Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – typecheck and build for production
- `npm run preview` – preview production build

## 🛡️ License
This project is open-source. Use it as a starter and customize it for your personal portfolio.
