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

## Deployment — split hosting (frontend on TrueHost, backend on Vercel)

The project is split into two independent deployments:

### Backend → Vercel (`backend/` folder)

The `backend/` folder is a self-contained Vercel project.

1. In Vercel, create a **New Project** and import this repo.
2. **Important:** set the **Root Directory** to `backend` in the Vercel project settings.
3. Add these environment variables in Vercel → Project → Settings → Environment Variables:

   | Variable | Value |
   |---|---|
   | `MONGODB_URI` | your Atlas connection string |
   | `MONGODB_DB` | `aremutech` |
   | `JWT_SECRET` | any 32+ character random string (Vercel can auto-generate) |
   | `ADMIN_EMAIL` | `aremutecheazysolutions@gmail.com` |
   | `ADMIN_PASSWORD_HASH` | run `npm run hash-password -- "yourpassword"` inside `backend/` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | your Gmail address |
   | `SMTP_PASS` | your 16-char Gmail App Password |
   | `MAIL_FROM` | `Aremu Tech Eazy Solutions <you@gmail.com>` |
   | `ADMIN_NOTIFY_EMAIL` | where new-application alerts go |
   | `SITE_URL` | `https://aremutecheazysolutions.com` |
   | `ALLOWED_ORIGIN` | `https://aremutecheazysolutions.com` |

4. Deploy. Your API will be live at `https://<your-vercel-project>.vercel.app/api/...`

### Frontend → TrueHost

1. In the root of this repo, create a `.env.production` file (or set it in your build environment):
   ```
   VITE_API_URL=https://<your-vercel-project>.vercel.app
   ```
2. Build the frontend:
   ```
   npm install
   npm run build
   ```
3. Upload the contents of the `dist/` folder to your TrueHost public directory via cPanel File Manager or FTP.

> **SSL required on both sides.** The session cookie is `SameSite=None; Secure`, which browsers only send over HTTPS. Make sure TrueHost has SSL active on `aremutecheazysolutions.com`.

### Alternative: single-server hosting (Render, Railway, VPS)

`npm run build && npm start` serves the frontend *and* the API from one Node process with no CORS setup needed. On Render, create a **Blueprint** from this repo using `render.yaml` and fill in the variables it asks for. Health check: `/healthz`.

## Notes

- Uploads are limited to 4 MB per file (large photos are shrunk in the browser first), because serverless requests are capped at ~4.5 MB.
- Login attempts and uploads are rate limited; admin sessions last 8 hours, applicant sessions 7 days.
- `npm run build` type-checks the app and the API, builds `dist/`, and writes `dist.zip`.
