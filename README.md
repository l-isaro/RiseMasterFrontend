# RISEMASTER Frontend

**RISEMASTER** is an AI-powered adaptive mathematics learning platform for Rwandan secondary school students (S1–S6). It uses real REB national examination past papers, step-by-step guidance, teen-friendly concept introductions, multi-level hints, and **Bayesian Knowledge Tracing (BKT)** to track and celebrate individual learning progress — promoting a growth mindset over final scores.

This repository contains the **frontend web application**.

> **Full Title:** Modeling Individual Educational Gain in STEM: An AI-Powered Platform for Tracking and Rewarding Learning Progress in African Higher Education

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Bayesian Knowledge Tracing](#bayesian-knowledge-tracing)
- [Testing](#testing)
- [Linting](#linting)
- [Features](#features)
- [Screenshots](#screenshots)


## Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9 (ships with Node) — or **Bun** ≥ 1.0

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-org>/RiseMasterFrontend.git
cd RiseMasterFrontend
```

### 2. Install dependencies

```bash
# Using npm
npm install

# Or using Bun
bun install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:8080**.

### 4. Build for production

```bash
npm run build
```

The output will be in the `dist/` directory. Preview it locally with:

```bash
npm run preview
```

---

## Available Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Start Vite dev server on port 8080               |
| `npm run build`      | Production build (TypeScript check + Vite build) |
| `npm run build:dev`  | Development build (unminified, with source maps) |
| `npm run preview`    | Preview the production build locally             |
| `npm run lint`       | Run ESLint across the codebase                   |
| `npm run test`       | Run all tests once with Vitest                   |
| `npm run test:watch` | Run tests in watch mode                          |


### Path Aliases

The project uses `@/` as an alias for `src/`:

```ts
import { Button } from "@/components/ui/button";
```

---

## Routing

| Path         | Page            | Description                                |
| ------------ | --------------- | ------------------------------------------ |
| `/`          | Onboarding      | Landing page & student registration        |
| `/login`     | Login           | Email / ID-based login                     |
| `/dashboard` | Dashboard       | Topic overview, mastery rings, quick stats |
| `/practice`  | PracticeSession | Adaptive step-by-step problem solving      |
| `/progress`  | Progress        | Mastery analytics & learning charts        |
| `/profile`   | Profile         | Student profile & settings                 |
| `/terms`     | TermsOfUse      | Terms of use                               |
| `*`          | NotFound        | 404 catch-all                              |

---

## API Integration

The frontend communicates with a REST API hosted at `https://risemasterbackend.onrender.com/api`. Key endpoints consumed:

| Function            | Method | Endpoint               |
| ------------------- | ------ | ---------------------- |
| `registerUser`      | POST   | `/users/register`      |
| `loginUser`         | POST   | `/users/login`         |
| `getTopics`         | GET    | `/topics?user_id=`     |
| `getUserStats`      | GET    | `/users/:id/stats`     |
| `getUserMastery`    | GET    | `/users/:id/mastery`   |
| `getNextProblem`    | POST   | `/problems/next`       |
| `submitInteraction` | POST   | `/interactions/submit` |

API functions are located in `src/data/api.js`.

---

## Bayesian Knowledge Tracing

The frontend includes a client-side BKT engine (`src/lib/bkt.ts`) that mirrors the pyBKT backend service. It maintains per-skill mastery using a Hidden Markov Model with four parameters:

- **P(L₀)** — initial probability of knowing the skill
- **P(T)** — probability of transitioning from unlearned → learned
- **P(G)** — probability of guessing correctly while not knowing
- **P(S)** — probability of slipping (incorrect despite knowing)

Parameters are tuned per topic difficulty (e.g., arithmetic vs. calculus) to produce realistic mastery curves.

---

## Testing

Tests use **Vitest** with **jsdom** and **React Testing Library**. Test files live in `src/test/integration/`.

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch
```

---

## Linting

ESLint is configured with TypeScript and React hooks rules.

```bash
npm run lint
```

---

## Features

- Responsive web layout (desktop-first, mobile & tablet supported)
- Student registration & login flow
- Dashboard with topic cards and mastery overview
- Adaptive practice sessions with step-by-step scaffolding
- Multi-level hint system (3 progressive hints per step)
- Real-time mastery tracking with BKT
- Progress analytics with Recharts visualizations
- KaTeX math rendering for equations and expressions
- Framer Motion animations & micro-interactions
- Dark/light theme support via next-themes
- Toast notifications (Sonner + Radix Toast)
- Student profile management


## License

This project is part of an academic research initiative. All rights reserved.
