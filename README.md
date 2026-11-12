# Gaurav Kumbhar — Portfolio

Single-page portfolio (plain HTML/CSS/JS, no build step). Dark burgundy theme with light-mode toggle, collapsible sidebar,
viewer-profile switcher, project cards with real screenots, certificates, architecture workflows and a contact form.

## Run locally
Open `index.html` in a browser (or `python3 -m http.server` in this folder). Fonts and tech logos load from the internet; the page still works offline with fallbacks.

## Make the contact form really send (required for production)
1. Create a free form at https://formspree.io and copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
2. Paste it into `FORM_ENDPOINT` at the top of `js/script.js`.
Until then the form opens the visitor's email app and says so — it never shows a fake "sent" message.

## Deploy
- **Vercel:** `npm i -g vercel`, then run `vercel` in this folder (framework: Other, no build command, output: `.`).
- **Render:** New > Static Site, connect the repo, build command empty, publish directory `.`.
- **Netlify / GitHub Pages:** drag the folder onto app.netlify.com/drop, or push and enable Pages.

## Edit content
Project cards, skills, certificates and experience are in `index.html`. Resume PDFs live in `resume/`, certificates in `certificates/`, project screenshots in `project-images/`.

## Notes
- The Yuva AI for All certificate PDF is intentionally NOT included: it prints your date of birth and APAAR ID. Add a redacted copy to `certificates/` and link it if you want it public.
- Items still needing your input are listed in the chat reply that came with this ZIP.
