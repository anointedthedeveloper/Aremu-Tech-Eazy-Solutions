# Aremu Tech Eazy Solutions

Marketing website for Aremu Tech Eazy Solutions, built with React, TypeScript, Vite, Tailwind CSS and React Router. Multi-page: Home, Services, About and Contact.

## Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — type-check and build for production
- `npm run lint` — run Oxlint
- `npm run preview` — preview the production build locally

## Structure

- `src/pages` — the four routes (Home, ServicesPage, About, Contact)
- `src/components` — shared page sections (Navbar, Hero, Services, Carousel, etc.)
- `src/lib/constants.ts` — site copy and data (nav links, services, process steps)
- `src/lib/images.ts` — hotlinked photo URLs used across the site (Unsplash), each with alt text
- `src/assets/brand` — logo assets

The primary customer enquiry channel is the company's Google Form. It's embedded
directly on `/contact` via an iframe (`ENQUIRY_FORM_EMBED_URL`), with an
"Open in new tab" fallback link (`ENQUIRY_FORM_URL`) — both defined in
`src/lib/constants.ts`. Every other "Submit an Enquiry" call-to-action on the
site routes to `/contact`.

Images use `SmartImage` (`src/components/SmartImage.tsx`), which falls back to
a branded placeholder panel instead of a broken-image icon if a URL fails to load.

## Deployment note

This is a client-side-routed single-page app. Whatever host you deploy to needs
a history-fallback rule (serve `index.html` for unmatched paths) so that direct
loads/refreshes of `/services`, `/about` and `/contact` work — e.g. Netlify's
`_redirects` (`/* /index.html 200`), Vercel's rewrites, or nginx `try_files`.
Vite's dev server and `vite preview` already do this automatically.
