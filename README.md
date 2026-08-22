# NC Dreams — Notebook Ledger

Materials, costing, and break-even calculator for the notebook / notepad / padpaper business.

## What this is

- `public/` — the whole app (plain HTML/CSS/JS, no build step)
- `api/data.js` — one serverless function that reads and writes your data in Supabase
- `schema.sql` — the one table this app needs
- `public/logo.png` — the NC Dreams logo, shown in the header

## Setup

1. **Supabase**: create a project (or reuse one), open **SQL Editor → New query**, paste in `schema.sql`, and run it. Then go to **Project Settings → API** and copy your **Project URL** and your **service_role** secret key (not the anon key — this app keeps the secret key server-side only, it's never sent to the browser).

2. **Push this to GitHub** (your new personal account, not the old Mach7 one):
   ```
   git init
   git add .
   git commit -m "NC Dreams notebook ledger"
   ```
   Create a new repo on github.com under your new account (call it whatever you like, e.g. `nc-dreams-notebook-calc`), then — swap `YOUR-USERNAME` for your actual new GitHub username:
   ```
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   - Import the repo into a new Vercel project
   - Under **Project Settings → Environment Variables**, add:
     - `SUPABASE_URL` = your Project URL
     - `SUPABASE_SERVICE_ROLE_KEY` = your service_role key
   - Deploy

4. **Share the live URL with your wife.** Anything either of you edits — materials, prices, stock, sales, settings — saves straight to Supabase and shows up for the other person on their next refresh.

## Notes

- There's no `npm install` step needed — the API function uses the built-in `fetch` that Vercel's Node runtime already has, no dependencies to install.
- If the app ever shows "Could not load saved data," it means the Vercel environment variables aren't set yet, or don't match Supabase — double check step 3.
- All your material prices, recipes, and business logic are the same ones we built and tested together — nothing changed except where the data is stored.
