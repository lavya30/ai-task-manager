# AI Task Manager — Backend

FastAPI + SQLite backend. Task CRUD, plus one AI endpoint that asks Groq
to suggest a priority order for your pending tasks.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# open .env and paste a real key from console.groq.com
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

Visit **http://localhost:8000/docs** — FastAPI auto-generates an interactive
API tester there. Use it to try every endpoint without a frontend.

## Try it

1. `POST /tasks` a couple of tasks (title + priority is enough)
2. `GET /tasks` to see them
3. `POST /ai/prioritize` — this sends your pending tasks to Groq and comes
   back with a suggested order + reasoning

If `/ai/prioritize` errors, it's almost always the API key — double check
`.env` has a real value and you restarted the server after editing it.

## What's next

Once this runs clean and you've tried it through `/docs`, tell me and
we'll build the Next.js frontend as its own step — no need to touch this
backend again until then.
