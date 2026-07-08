# AI Task Manager

A task manager with an AI-assisted prioritization feature. Built as a
from-scratch portfolio project — FastAPI backend, Next.js frontend,
Groq for the AI feature.

## Structure

```
ai-task-manager/
├── backend/     FastAPI + SQLite + Groq — see backend/README.md
└── frontend/    Next.js + TypeScript + Tailwind — see frontend/README.md
```

## Run locally

Two terminals:

```bash
# terminal 1
cd backend && uvicorn main:app --reload --port 8000

# terminal 2
cd frontend && npm run dev
```

Then open http://localhost:3000.

## Roadmap

- [x] Backend: task CRUD + AI prioritization endpoint
- [x] Frontend: kanban board + AI prioritize panel
- [ ] Docker + Docker Compose
- [ ] Kubernetes manifests
- [ ] Helm chart
- [ ] GitHub Actions CI/CD
