# Aremu Tech Eazy Solutions

Marketing website for Aremu Tech Eazy Solutions, built with React, TypeScript, Vite and Tailwind CSS.

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

- `src/components` — page sections (Navbar, Hero, Services, etc.)
- `src/lib/constants.ts` — site copy and data (nav links, services, process steps)
- `src/assets/brand` — logo assets

The primary customer enquiry channel is the company's Google Form, linked from
the "Submit an Enquiry" call-to-action throughout the site (`ENQUIRY_FORM_URL`
in `src/lib/constants.ts`).
