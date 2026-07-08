# AI Task Manager — Frontend

Next.js 14 (App Router) + TypeScript + Tailwind. A kanban board (To do /
In progress / Done) that talks to the FastAPI backend, plus an "AI
prioritize" button that asks the backend's `/ai/prioritize` route to
suggest a work order.

## Setup

Make sure the backend is already running on port 8000 (see `backend/README.md`).

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Visit **http://localhost:3000**.

## Notes

- `npm audit` will flag some Next.js advisories related to self-hosted
  middleware and the image optimizer — none of that surface area is used
  here (no middleware, no `next/image`), so they don't apply to this app.
  Worth revisiting before any real production deploy.
- If the board shows "Can't reach the backend", double-check the backend
  is running and `NEXT_PUBLIC_API_URL` in `.env.local` points at it.

## What's next

Once both frontend and backend run together locally, that's your full
local dev loop working — the real milestone. After that we can add the
DevOps layer (Docker, Compose, K8s, Helm, CI/CD) on top of this repo,
same way as we scoped for FocusEdu, except this time it's fully your own
code, which makes for a stronger project + resume story.
