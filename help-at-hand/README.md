# Help at Hand — deployment
Static PWA, no build step. Upload the whole folder to any HTTPS host (Netlify, Cloudflare Pages, GitHub Pages, Vercel, or nginx/Apache).
- **HTTPS is required** for install + offline (localhost also works for testing: `python3 -m http.server 8080`).
- Keep files together: `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`. Works in a subfolder.
- `_headers` applies on Netlify/Cloudflare Pages; on nginx/Apache set the same headers, and serve `sw.js` with `Cache-Control: no-cache`.
- QR code: open the hosted URL → tap "📲 QR". It encodes the live address. The QR library loads from cdnjs (cached afterwards); to self-host, download `qrcode.min.js` (qrcodejs 1.0.0), change the `<script src>` and the `QR` constant in `sw.js`, and remove cdnjs from the CSP.
- After editing files, bump `V='hah-v1'` in `sw.js` so users get the update.
- Prototype note: sign-in and data are stored in the browser only; add a real backend/auth and video service before real patient use.
