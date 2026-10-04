# PlanB

> **Because Plan A rarely survives reality.**

PlanB is an AI-powered contingency planner that challenges your Plan A, identifies what could realistically go wrong, and helps you prepare a smarter Plan B before you need it.

When something actually goes wrong, PlanB uses the original context to help you build a recovery-focused **Plan C**.

## Why I Built This

My friend is great at making Plan A.

He is not so great at thinking about what happens when Plan A fails.

A delayed train, unavailable person, missed deadline, broken dependency, or unexpected change can turn a perfectly reasonable plan into a stressful situation.

So instead of building another AI that creates plans, I built one that tries to **break them**.

PlanB asks:

> What assumptions does this plan depend on, and what happens when one of them fails?

The goal is not to generate catastrophic scenarios. It is to identify realistic weak points early enough that you can do something about them.

## How It Works

```text
Your Plan A
    ↓
Gemma
    ↓
Understand the goal
    ↓
Identify assumptions
    ↓
Find realistic failure scenarios
    ↓
Warning signs + Prevention + Backup
    ↓
Plan B
    ↓
Something went wrong?
    ↓
Plan C
```

### 1. Describe your Plan A

For example:

```text
Tomorrow I have a job interview in Delhi at 11 AM.
My train leaves at 6 AM.
```

### 2. PlanB stress-tests it

PlanB identifies assumptions such as:

- the train arrives on time
- you reach the station before departure
- transport from the station to the interview is available

It then generates realistic failure scenarios with:

- impact level
- warning signs
- prevention
- backup plan

### 3. Prepare before anything goes wrong

PlanB produces a **Prepare Now** checklist containing actions you can take immediately to reduce risk.

### 4. Reality changes

If something actually happens, select **Something went wrong?** and describe the situation.

For example:

```text
My train is running two hours late.
```

PlanB uses your original plan, previous analysis, and the new situation to generate **Plan C** with:

- situation summary
- immediate actions
- revised plan
- additional risks to watch

## Features

- AI-powered Plan A stress testing
- Goal and assumption analysis
- Realistic failure scenario generation
- Risk impact classification
- Early warning signs
- Preventive actions
- Backup strategies
- Prepare Now checklist
- Context-aware Plan C recovery
- Responsive web interface
- Structured AI output validated by Pydantic

## Built with Gemma

PlanB uses Google's open-weight **Gemma** model as its reasoning engine.

Gemma is instructed to challenge a user's plan rather than simply improve it.

The core question behind the prompt is:

> What assumptions does this plan depend on, and what happens when one fails?

The model returns structured JSON that is validated by the FastAPI backend using Pydantic before being sent to the frontend.

This keeps the AI output predictable enough to power a structured product experience instead of displaying unrestricted model text.

## Architecture

```text
┌─────────────────────┐
│       Next.js       │
│      Frontend       │
└──────────┬──────────┘
           │
           │ HTTP
           ▼
┌─────────────────────┐
│       FastAPI       │
│        API          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   PlannerService    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Gemma Client     │
│  gemma-4-26b-a4b-it │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Pydantic Validation │
└─────────────────────┘
```

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python
- Pydantic
- Google Gen AI SDK

### AI

- Gemma
- `gemma-4-26b-a4b-it`

## API

### Analyze a Plan

```http
POST /api/v1/plans/analyze
```

Example request:

```json
{
  "plan": "Tomorrow I have a job interview in Delhi at 11 AM. My train leaves at 6 AM."
}
```

The API returns:

- summary
- assumptions
- risks
- warning signs
- prevention strategies
- backup strategies
- prepare-now actions

### Recover When Something Goes Wrong

```http
POST /api/v1/plans/recover
```

The recovery endpoint receives:

- original plan
- original Plan B analysis
- what actually went wrong

It returns a context-aware Plan C.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/itsdevcode/planb.git
cd planb
```

### 2. Backend

Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

Install the project:

```bash
pip install -e .
```

Create `.env`:

```env
GEMMA_API_KEY=your_google_ai_studio_api_key
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start Next.js:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Project Structure

```text
planb/
├── app/
│   ├── ai/
│   │   └── gemma.py
│   ├── api/
│   │   └── plans.py
│   ├── core/
│   │   └── config.py
│   ├── schemas/
│   │   └── plan.py
│   ├── services/
│   │   └── planner.py
│   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
│
├── tests/
├── pyproject.toml
└── README.md
```

## Design Philosophy

PlanB intentionally does **not** try to predict every possible disaster.

A useful contingency planner should focus on:

1. realistic assumptions
2. plausible failures
3. early warning signals
4. actions the user can take now
5. practical recovery options

The objective is preparedness, not paranoia.

## Hacktoberfest Weekend Challenge 2026

PlanB was built for the **Hacktoberfest Weekend Challenge 2026 — Build for a Friend**.

The project was created around a simple real-world problem: people are usually good at making plans, but often fail to think through what happens when one important assumption breaks.

PlanB turns that problem into an AI-powered contingency planning experience.

## Status

MVP complete.

Current flow:

```text
Plan A → Stress Test → Plan B → Reality Changes → Plan C
```

## Author

Built by **itsdevcode** for Hacktoberfest Weekend Challenge 2026.