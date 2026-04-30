# Next.js App

This workspace is now based on the Next.js app router. The old standalone HTML pages and legacy static bundle have been removed.

## Main files

- `app/` contains routes.
- `components/` contains shared UI and dashboard components.
- `lib/` contains Supabase, session, formatting, and dashboard helpers.
- `public/images/` contains public image assets.
- `app/globals.css` contains shared styling.

## Run

1. Install dependencies
   - `npm install`

2. Start development server
   - `npm run dev`

3. Open
   - `http://localhost:3000`

## Notes

- Login still stores the current user in `localStorage`.
- The dashboard is the main migrated data-rich screen.
- Supporting routes are now native Next.js pages and can be expanded with full workflows next.
