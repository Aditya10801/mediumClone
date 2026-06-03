# Sortie

A full-stack Medium-style blogging clone with a React + Vite frontend and a Cloudflare Workers + Hono backend.

## Project Structure

- `frontend/` — React app built with Vite, TypeScript, Tailwind CSS, and React Router DOM.
- `backend/` — Cloudflare Workers backend using Hono, PostgreSQL, Prisma, JWT authentication, and Wrangler.

## Stack

- Frontend
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - React Router DOM

- Backend
  - Cloudflare Workers via Wrangler
  - Hono
  - PostgreSQL
  - Prisma
  - JWT authentication (`hono/jwt`)
  - Vitest for testing

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite dev server in your browser (default: `http://localhost:5173`).

### Backend

```bash
cd backend
npm install
npm run dev
```

This starts the Cloudflare Workers local dev server via `wrangler dev`.

## Environment

The backend requires these environment variables:

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — JWT signing secret

Do not commit these secrets.

## API Overview

The backend exposes:

- `POST /api/v1/user/signup` — create a user and return a JWT
- `POST /api/v1/user/signin` — sign in and return a JWT
- `GET /api/v1/blog/bulk` — list all blog posts
- `GET /api/v1/blog/:id` — get a single post by ID
- `POST /api/v1/blog/` — create a new post (authenticated)
- `PUT /api/v1/blog/` — update a post (authenticated)

> All `/api/v1/blog/*` routes require `Authorization: Bearer <token>`.

## Notes

- The frontend and backend are currently separated into their own folders.
- The backend stores passwords in plain text at the moment. Add hashing before production.
- Use Git from the repo root to manage both frontend and backend changes.

## Useful Commands

From the repository root:

```bash
cd frontend && npm run dev
cd backend && npm run dev
```

## Next Step

Once the backend is deployed or available locally, connect the frontend API calls to the backend base URL and verify auth flows.
