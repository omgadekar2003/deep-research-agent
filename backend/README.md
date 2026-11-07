---

## Pre-GitHub Checklist

### 1. Verify `.env` is not tracked

**Backend** — in `deep_research_a2/`:

```powershell
cd C:\Users\ADMIN\Desktop\OG\genai_projects\deep_research_a2_project\deep_research_a2
git status
```

**If it says "not a git repository"** → good, no repo yet, we'll start fresh.

**If it shows files** → run:
```powershell
git log --all --full-history -- .env
```
If that produces output, the `.env` is already in history. Paste the output and I'll tell you how to clean it.

### 2. Check `.gitignore` exists in both folders

**Backend** — create or verify `deep_research_a2/.gitignore`:

```gitignore
venv/
__pycache__/
*.pyc
*.pyo
.env
.env.*
!.env.example
*.db
*.db-journal
*.db-wal
checkpoints.db*
app.db
reports/
debug_tags.txt
frozen_*.txt
test_output.pdf
report_*.pdf
.DS_Store
```

**Frontend** — verify `frontend/.gitignore` has:

```gitignore
node_modules/
.next/
out/
build/
.env*.local
.env
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### 3. Create `.env.example` files (safe to commit)

**Backend** — `deep_research_a2/.env.example`:

```env
# LLM
LLM_PROVIDER=gemini
LLM_API_KEYS=your_gemini_key_1,your_gemini_key_2
LLM_MODEL=gemini-2.0-flash

# Search
SEARCH_PROVIDER=tavily
SEARCH_API_KEYS=your_tavily_key_1,your_tavily_key_2

# App
SECRET_KEY=generate_with_secrets_token_urlsafe_64
APP_NAME=Deep Research API
ENVIRONMENT=dev
DEBUG=True

# JWT
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Database
DATABASE_URL=sqlite:///./app.db
CHECKPOINT_DB=./checkpoints.db

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# Sarvam (voice)
SARVAM_API_KEY=your_sarvam_key
```

**Frontend** — `frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Remove leftover test artifacts

```powershell
# Backend
cd C:\Users\ADMIN\Desktop\OG\genai_projects\deep_research_a2_project\deep_research_a2
Remove-Item -Force test_output.pdf, report_*.pdf, debug_tags.txt, frozen_*.txt -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force reports, __pycache__ -ErrorAction SilentlyContinue

# Frontend
cd ..\frontend
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
```

### 5. Add a `README.md` (both folders)

**Backend README** — a short one:

```markdown
# Deep Research Agent — Backend

FastAPI backend for the Deep Research Agent. Uses LangGraph for the agent pipeline, Gemini as the LLM, Tavily for search.

## Setup

```bash
python -m venv venv
venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
cp .env.example .env
# fill in your keys in .env
alembic upgrade head
python -m uvicorn main:app --reload
```

## Endpoints

- `POST /auth/register` — create account
- `POST /auth/login` — login
- `POST /auth/refresh` — rotate tokens
- `POST /research/start` — start a research run
- `GET /research/{id}/stream` — SSE progress stream
- `GET /research/{id}` — fetch completed report
- `GET /research/{id}/pdf` — download PDF
- `POST /research/transcribe` — voice to text
- `GET /health` — health check
```

**Frontend README** — similar.

---

## Now — two choices for GitHub structure

### Option A — One repo, two folders (monorepo)

```
deep-research-agent/           ← single GitHub repo
├── backend/                   ← was deep_research_a2
├── frontend/                  ← was frontend
├── README.md
└── .gitignore
```

**Pros:** One URL, easier to review, one deploy hook per folder on Vercel/Render.
**Cons:** Can't deploy backend and frontend independently without root-level scripts.

### Option B — Two separate repos

```
deep-research-backend/         ← repo 1
deep-research-frontend/        ← repo 2
```

**Pros:** Cleaner separation. Each repo has its own `.gitignore`, deps, deploy.
**Cons:** Two URLs.

**My recommendation: Option B (two repos).** It's simpler, matches what Vercel and Render expect, and avoids "should I run `npm` or `pip` from where?" confusion.

---

## What to do right now

**Answer this question:**

1. **Option A (monorepo) or Option B (two repos)?**

Then:

2. **Run this and paste the output:**

```powershell
cd C:\Users\ADMIN\Desktop\OG\genai_projects\deep_research_a2_project\deep_research_a2
git status 2>&1 | Select-Object -First 10
```

3. **Run this and paste the output:**

```powershell
cd ..\frontend
git status 2>&1 | Select-Object -First 10
```

These tell me whether either folder already has a git repo (which affects how we set it up).

---

Once you answer all three, I'll give you the exact `git init` → `git add` → `git commit` → `gh repo create` → `git push` sequence for whichever option you pick. Then we move to hosting.