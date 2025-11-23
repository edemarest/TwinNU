## Development

- `npm install`
- `npm run dev` → http://localhost:3000

## Deploying to Netlify

This project relies on Netlify’s official Next.js runtime to serve the App Router build.

1. `netlify.toml` already includes `@netlify/plugin-nextjs`; leave it enabled so Netlify creates the required serverless functions.
2. Set the publish directory to `.next` (done in `netlify.toml`).
3. Add these environment variables in Netlify → Site settings → Build & deploy → Environment:
   - `NETLIFY_FORM_ID` – the ID of your “pilot-interest” form in Netlify Forms.
   - `NETLIFY_AUTH_TOKEN` – a personal access token with permission to create form submissions.

The pilot interest form submits through `app/api/forms/pilot-interest` which proxies to Netlify Forms via their REST API. As long as the two environment variables are present, the build can run with `@netlify/plugin-nextjs` and the deployed site will resolve correctly instead of returning Netlify’s generic 404.
