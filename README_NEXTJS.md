# Next.js Migration

This workspace now includes a Next.js app structure on top of the existing HTML project.

## Migrated now

- `app/login/page.js`
- `app/dashboard/page.js`
- `components/dashboard-client.js`
- shared browser Supabase/session helpers in `lib/`
- shared styling in `app/globals.css`

## Still old HTML

The original `.html` pages are still in the project and can be used as reference while the remaining screens are migrated.

## Run

1. Install dependencies
   - `npm install`

2. Start development server
   - `npm run dev`

3. Open
   - `http://localhost:3000`

## Notes

- The new app keeps the current browser-side Supabase approach.
- Login still stores the current user in `localStorage`.
- Sidebar links other than dashboard are placeholders for now and should be migrated next.
