# Ziki Agent Buddies

A small React + Vite concept featuring one friendly Ziki agent. Its eyes follow a mouse pointer, and clicking, tapping, or pressing it gives a brief hello. This project is independent of Task 1 and does not connect to Ziki services or production data.

**Live demo:** [ziki-agent-buddies-xm2u.vercel.app](https://ziki-agent-buddies-xm2u.vercel.app/)

## Run locally

Requires Node.js 20.19 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

The static production output is written to `dist/`. There are no environment variables or backend services.

## Deploy

The live app is hosted on Vercel. Build with `npm run build` and use `dist` as the output directory. No server-side routing or environment variables are required.

## GitHub

Create an empty repository named `ziki-agent-buddies` under your own GitHub account, then from this directory run:

```bash
git init -b main
git add .
git commit -m "Build Ziki Agent Buddies"
git remote add origin https://github.com/<your-username>/ziki-agent-buddies.git
git push -u origin main
```

`.gitignore` excludes dependencies, generated build output, local environment files, logs, and Vercel's local project metadata.
