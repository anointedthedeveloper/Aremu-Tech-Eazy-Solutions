# Aremu Tech Eazy Solutions — website

React + Vite front end with serverless API routes (`/api`) backed by MongoDB.

## What's in it

- Public site: home, services (one page each), projects, internship, about, contact.
- **Contact Us** form → saved to MongoDB, shown to the admin.
- **Apply** form (apprenticeship / IT-SIWES-NYSC) → documents are uploaded to MongoDB GridFS, the application is saved, and the applicant is **emailed a login** for their dashboard.
- **Applicant dashboard** (`/login` → `/dashboard`): application status, messages from the team, their details and documents, change password.
- **Admin dashboard** (`/lgad` → `/admin`): overview stats, all applications (search, filter, CSV export, open documents, set status, message the applicant, reset their password), enquiries, applicant accounts.
  The admin has its own sign-in page at **`/lgad`** (not linked anywhere on the site). Admin credentials come from environment variables and are rejected by the normal applicant login, and vice versa.

## Setup

1. **MongoDB** — create a free cluster at <https://www.mongodb.com/atlas>, create a database user, allow network access (for Vercel use `0.0.0.0/0`), and copy the connection string.
2. **Environment variables** — copy `.env.example` to `.env` (local) and add the same values in Vercel → Project → Settings → Environment Variables:

   | Variable | Purpose |
   |---|---|
   | `MONGODB_URI`, `MONGODB_DB` | database |
   | `JWT_SECRET` | signs login cookies (32+ random characters) |
   | `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` | admin login for `/lgad` (create the hash with `npm run hash-password -- "your password"`) |
   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | sends login emails. For Gmail use `smtp.gmail.com`, port `465`, and a Google **App Password** (Google Account → Security → 2-Step Verification → App passwords) |
   | `ADMIN_NOTIFY_EMAIL` | optional, where "new application / enquiry" alerts go |
   | `SITE_URL` | public address used in emails |

3. **Run locally** — `npm install`, then `npm run dev`. The dev server also serves `/api`.
4. **Deploy** — push to the connected Vercel project. `vercel.json` routes everything except `/api` to the app.

If SMTP is not set up the site still works: applications are saved, and in the admin page **Reset & resend login** shows the new password on screen so you can give it to the applicant.

## Two ways to host it

The same API code runs in both, so pick whichever you like:

- **Vercel** (default): `/api/*.ts` become serverless functions automatically. Just add the environment variables.
- **Standalone Node server** (Render, Railway, a VPS…): `npm run build && npm start` serves the website *and* the API from one address (no CORS setup). On Render, create a **Blueprint** from this repo (`render.yaml`) and fill in the variables it asks for. Health check: `/healthz`.

In MongoDB Atlas, open **Network Access** and allow `0.0.0.0/0` so Vercel/Render can connect.

## Notes

- Uploads are limited to 4 MB per file (large photos are shrunk in the browser first), because serverless requests are capped at ~4.5 MB.
- Login attempts and uploads are rate limited; admin sessions last 8 hours, applicant sessions 7 days.
- `npm run build` type-checks the app and the API, builds `dist/`, and writes `dist.zip`.
