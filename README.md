# Nandita Valentine's Website

A static website with a memory timeline and a Valentine proposal interaction.

## Files

- `index.html` - page structure and content
- `style.css` - styling, animations, responsive layout
- `script.js` - timeline reveal + proposal interactions
- `*.png` - memory photos

## Run locally

Open `index.html` directly in a browser, or use a local server:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy on Vercel (GitHub Import)

1. Push this repo to GitHub.
2. Go to Vercel Dashboard: https://vercel.com/new
3. Import `Amruth2105/nand`.
4. Framework preset: `Other`.
5. Build command: leave empty.
6. Output directory: leave empty.
7. Click **Deploy**.

Vercel will serve `index.html` as the site entry automatically.

## Optional: Vercel CLI deploy

```powershell
npm i -g vercel
vercel login
vercel --prod
```
