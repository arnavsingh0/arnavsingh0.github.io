# Arnav Singh

Personal site for Arnav Singh, a physics and computer science student at Dartmouth. The opening is a short biography and a drawing of a planetary transit you can drag. Study, work, research, and projects follow. Lunar Rover Rescue is playable from the projects section.

The lunar rover is a small browser game at `/lunar-rover`.

Live site: [arnavsingh0.github.io](https://arnavsingh0.github.io)

## Stack

React, Vite, and Tailwind. GitHub Pages serves the production build. A push to `main` runs `.github/workflows/deploy.yml`, which builds `dist` and publishes it. The build copies `index.html` to `404.html` so client-side routes such as `/lunar-rover` resolve on GitHub Pages.

## Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

The contact form uses EmailJS. Set `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, and `VITE_APP_EMAILJS_PUBLIC_KEY` in the environment. Without them, the form tells the visitor to use LinkedIn instead.
