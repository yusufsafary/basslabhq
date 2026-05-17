# BassLab HQ

Precision Tools for Fishing Simulation Players — a premium fishing generator platform at [basslabhq.com](https://basslabhq.com).

## About

BassLab HQ is a fully client-side fishing simulation generator. Players configure their lake, species, difficulty, and environmental modifiers to generate detailed fishing session data styled like in-game loot drops.

## Pages

- **Home** — Hero section, features overview, and CTAs
- **Generator** — Interactive session generator with loot-style result cards
- **About** — Brand story and mission
- **Contact** — Contact form with success state

---

## Local Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Install and Run

```bash
# From the monorepo root
pnpm install

# Run the frontend dev server
pnpm --filter @workspace/basslabhq run dev
```

The app will be available at `http://localhost:<PORT>`.

---

## Deploy to GitHub and Vercel

### Step 1 — Add Secrets to Your Environment

You need two tokens:

| Secret | Where to get it |
|---|---|
| `GITHUB_TOKEN` | GitHub Settings > Developer settings > Personal access tokens > Tokens (classic) — grant `repo` scope |
| `VERCEL_TOKEN` | Vercel Dashboard > Account Settings > Tokens |

Add them as environment variables or Replit Secrets before running the push script.

### Step 2 — Push to GitHub

Use the included push script to initialize and push to your GitHub repository:

```bash
# From the monorepo root
bash scripts/deploy/push-to-github.sh
```

The script will:
1. Initialize a git repository inside `artifacts/basslabhq/` (if not already initialized)
2. Add all files and create an initial commit
3. Create a new GitHub repository named `basslabhq` under your account (using `GITHUB_TOKEN`)
4. Push the code to `main`

> You can edit `scripts/deploy/push-to-github.sh` to change the repo name or organization.

### Step 3 — Deploy to Vercel

After pushing to GitHub, deploy with:

```bash
bash scripts/deploy/deploy-to-vercel.sh
```

The script will:
1. Link the GitHub repo to a new Vercel project named `basslabhq`
2. Trigger a deployment using the Vercel API
3. Print the live deployment URL

### Step 4 — Set Custom Domain (optional)

1. Go to your Vercel project dashboard
2. Navigate to Settings > Domains
3. Add `basslabhq.com` and follow the DNS configuration steps

---

## Folder Structure

```
artifacts/basslabhq/
├── src/
│   ├── App.tsx              # Router and root app
│   ├── index.css            # Global theme and styles
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Generator.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   └── components/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── ui/              # shadcn/ui components
├── public/
├── index.html               # Entry HTML with SEO meta tags
├── vercel.json              # Vercel deployment config
├── vite.config.ts           # Vite build config
└── package.json
```

---

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Wouter (routing)
- shadcn/ui components
- Lucide React (icons)

---

## License

MIT
