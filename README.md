# CAU Hackathon Dashboard (Vite + React)

## Quick start

1. Replace `src/api.js` BASE_URL with your deployed API Gateway URL.
2. Put your logo image at `public/cau_logo.png`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run dev:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. Deploy `dist` folder to GitHub Pages (or any static host). Using HashRouter, the app works on GitHub Pages without extra redirects.

## Notes
- `HashRouter` is used so GitHub Pages doesn't require extra redirect config.
- Frontend polls `/scores` every 30 seconds.
