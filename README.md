# Home Frontend Template

React + Vite + TypeScript starter template for personal frontend projects.

## Stack
- React 18
- TypeScript 5
- Vite 7
- Vitest + Testing Library

## What Included
- Login page with demo credential autofill
- Auth context with token persistence (`localStorage`)
- Protected route for home page
- Home page project table from backend API

## Quick Start
```bash
cp .env.example .env
pnpm install
pnpm dev
```

App default: `http://localhost:5173`

## Required Backend
- Start backend template first: `http://localhost:8081`
- Frontend uses `VITE_API_BASE_URL` from `.env`

## Commands
```bash
pnpm dev
pnpm test
pnpm build
pnpm preview
```

## Project Structure
```
src
├── App.tsx
├── auth/
├── api/
├── main.tsx
├── styles.css
├── components/
├── pages/
└── types/
```

## Demo Flows
- Login: `demo@home.io / home1234`
- After login: Home screen with project list table

## Routes
- `/login`: login form
- `/`: protected home page (project list)

## Environment
`.env.example`
```bash
VITE_APP_NAME=home-frontend-template
VITE_API_BASE_URL=http://localhost:8081
```

## Notes
- This template intentionally keeps auth simple for bootstrap speed.
- Replace token handling with stronger auth strategy when moving to production.
