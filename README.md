
---

```markdown
# Deep Research Agent

> An autonomous AI research system that plans its own searches, reads multiple web sources, verifies claims across them, and writes a fully cited report — in under 2 minutes.

---

## What it does

You ask a question. The agent:

1. **Plans** — breaks your question into 3–5 focused sub-queries
2. **Searches** — runs each through Tavily and deduplicates results
3. **Reads** — fetches full pages and extracts 3–7 concrete facts per source
4. **Verifies** — groups facts across sources, marks supported/single-source/contradicted
5. **Decides** — loops back with refined queries if information is insufficient (max 2 rounds)
6. **Writes** — generates a markdown report with inline citations `[1][2][3]`

Every claim is traced to a real source URL. No hallucinations. No invented citations.

---

## Demo

![Deep Research Agent Demo](docs/demo.gif)

*Landing page → signup → live SSE progress → cited report → PDF download.*

---

## Features

- **6-agent LangGraph pipeline** — Planner, Searcher, Reader, Verifier, Decider, Writer
- **Live progress streaming** via Server-Sent Events (see every node in real time)
- **Cross-source verification** — supported (2+ sources), single-source, contradicted
- **Self-correcting loop** — refines queries when info is insufficient
- **Inline citations** — `[1]`, `[2][3]` link to actual source URLs
- **Voice input** — Sarvam speech-to-text (English + Indian languages, Hinglish)
- **PDF export** — download any report as a formatted PDF
- **User accounts** — JWT + bcrypt + rotating refresh tokens
- **Per-user history** — every run saved, revisit anytime
- **Multi-key rotation** — Gemini and Tavily keys rotate automatically on quota errors
- **Provider-agnostic** — swap Gemini → OpenAI, or Tavily → Brave, via `.env` only

---

## Tech stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Backend** | FastAPI, Python 3.12 |
| **Agent** | LangGraph (state machine orchestration) |
| **LLM** | Google Gemini |
| **Search** | Tavily |
| **Voice** | Sarvam (Speech-to-Text) |
| **PDF** | ReportLab |
| **Database** | SQLite via SQLAlchemy 2.0 (Postgres-ready) |
| **Migrations** | Alembic |
| **Auth** | JWT + bcrypt + refresh token rotation |
| **Streaming** | Server-Sent Events (SSE) |

---

## Project structure

```
.
├── backend/                 FastAPI + LangGraph pipeline
│   ├── app/
│   │   ├── api/             HTTP endpoints (auth, research)
│   │   ├── core/            Security, dependencies
│   │   ├── models/          SQLAlchemy models (User, ResearchRun)
│   │   ├── schemas/         Pydantic request/response schemas
│   │   └── services/        Business logic (auth, research, PDF)
│   ├── providers/
│   │   ├── llm/             LLM provider abstraction (Gemini, OpenAI)
│   │   └── search/          Search provider abstraction (Tavily, Brave)
│   ├── utils/               Key rotator (multi-key failover)
│   ├── alembic/             Database migrations
│   ├── graph.py             LangGraph state machine
│   ├── nodes.py             6 pipeline nodes
│   ├── state.py             Shared research state
│   └── main.py              FastAPI entry point
│
└── frontend/                Next.js UI
    ├── app/
    │   ├── page.tsx         Landing page
    │   ├── login/           Login page
    │   ├── signup/          Signup page
    │   ├── app/             Protected app (new research, history)
    │   └── report/[id]/     Report viewer + PDF download
    ├── components/          Shared UI (Sidebar, ProgressStream, ReportView)
    └── lib/                 API client, auth helpers, types
```

---

## How the agent works

```
                    ┌─────────────┐
                    │   Question  │
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │  Planner    │  Gemini breaks question into sub-queries
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │  Searcher   │  Tavily searches web for each sub-query
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │  Reader     │  Fetch pages, extract facts per source
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │  Verifier   │  Group facts across sources, detect contradictions
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │  Decider    │  Enough info?
                    └──────┬──────┘
                    ┌──────┴──────┐
              "loop"│             │"proceed"
                    ▼             ▼
              ┌──────────┐  ┌──────────┐
              │ Planner  │  │  Writer  │  Generate cited markdown report
              │ (refine) │  └────┬─────┘
              └──────────┘       ▼
                            ┌──────────┐
                            │  Report  │
                            └──────────┘
```

State is persisted via SQLite checkpointer after every node — a crashed run can resume.

---

## Running locally

### Prerequisites

- **Python 3.12+**
- **Node.js 20.9+**
- API keys: [Gemini](https://aistudio.google.com/app/apikey), [Tavily](https://tavily.com), [Sarvam](https://sarvam.ai)

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\Activate.ps1
# macOS/Linux
source venv/bin/activate

python -m pip install -r requirements.txt
cp .env.example .env
# Fill in your keys in .env

alembic upgrade head
python -m uvicorn main:app --reload
```

Backend runs at **http://localhost:8000**. Health check: `GET /health`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

Frontend runs at **http://localhost:3000**.

---

## API endpoints

### Auth
| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/register` | Create account, returns JWT + refresh token |
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/refresh` | Rotate tokens |
| `POST` | `/auth/logout` | Revoke refresh token |
| `GET` | `/auth/me` | Current user |

### Research
| Method | Path | Description |
|---|---|---|
| `POST` | `/research/start` | Create a research run |
| `GET` | `/research/{id}/stream` | **SSE** live progress stream |
| `GET` | `/research/{id}` | Fetch completed run |
| `GET` | `/research/{id}/pdf` | Download PDF |
| `GET` | `/research/history` | List user's past runs |
| `POST` | `/research/transcribe` | Voice → text (Sarvam) |

---

## Environment variables

### Backend (`backend/.env`)

```env
# LLM provider (gemini | openai)
LLM_PROVIDER=gemini
LLM_API_KEYS=key1,key2
LLM_MODEL=gemini-2.0-flash

# Search provider (tavily | brave)
SEARCH_PROVIDER=tavily
SEARCH_API_KEYS=key1,key2

# App secret (generate with: python -c "import secrets; print(secrets.token_urlsafe(64))")
SECRET_KEY=your_random_secret

# Database
DATABASE_URL=sqlite:///./app.db
CHECKPOINT_DB=./checkpoints.db

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# Voice
SARVAM_API_KEY=your_sarvam_key
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Design decisions

### Why LangGraph instead of plain chains?

A plain chain runs top-to-bottom once. LangGraph supports **cycles** — the decider can send execution back to the planner when it needs more information. That self-correction loop is what makes it an *agent*, not a script.

### Why multi-key rotation?

Free-tier LLM and search APIs have tight quotas. When key 1 hits a rate limit, the rotator puts it on a 5-minute cooldown and instantly retries with key 2. No user-facing failure, no manual intervention.

### Why SSE instead of WebSockets?

Research runs are **one-directional** (server → client progress updates). SSE is the correct protocol for this: it's simpler, works over plain HTTP, auto-reconnects, and doesn't need the WebSocket handshake overhead.

### Why provider abstraction?

The `LLMProvider` and `SearchProvider` interfaces mean Gemini can be swapped for OpenAI, or Tavily for Brave, by changing **one line in `.env`** — no code changes. That makes the app resilient to price changes and provider outages.

### Why graceful failure at every node?

A deep research pipeline has ~10 external calls. Any one can fail. Every node catches its own errors and records them in state rather than crashing the run — a partial report is still useful; a 500 error is not.

---

## Deployment

| Service | Platform | Root directory |
|---|---|---|
| Backend | [Render](https://render.com) | `backend/` |
| Frontend | [Vercel](https://vercel.com) | `frontend/` |

Both platforms auto-detect the language from the folder contents.

---

## What's next

- [ ] Postgres migration (currently SQLite — schema is already Postgres-compatible)
- [ ] Celery background queue for long-running research (currently SSE + asyncio)
- [ ] Shareable report links (public read-only URLs)
- [ ] Citation hover previews in the frontend
- [ ] Multi-language reports (currently English output only)

---

## License

MIT

---

## Built with

Next.js · FastAPI · LangGraph · Google Gemini · Tavily · Sarvam · ReportLab · SQLAlchemy · Alembic
```

---