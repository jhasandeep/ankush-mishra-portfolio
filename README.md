# Ankush Mishra - Portfolio

Next.js (App Router) + Tailwind CSS v4 + Framer Motion.

- `npm run dev` - start locally on http://localhost:3000
- `npm run build && npm start` - production build

## Editing content
All text (projects, experience, skills, hero copy for company vs consulting visitors) lives in `src/data/portfolio.ts`.
The downloadable resume is `public/Ankush-Mishra-Resume.pdf` - replace the file to update it.

## Contact form
`/api/contact` sends mail through Resend. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in the environment.
