# 🗳️ ElectionLearn Interactive Assistant

An engaging, interactive platform that demystifies the election process through timelines, quizzes, and structured learning modules.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vite + React 18 + TypeScript |
| State | Zustand |
| Animations | Framer Motion |
| Timeline | D3.js |
| Backend | Node.js + Express + TypeScript |
| ORM | Prisma |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |

## Quick Start

### Prerequisites
- Node.js 20+
- Docker Desktop (for PostgreSQL + Redis)

### 1. Clone & Install

```bash
# Install backend deps
cd backend && npm install

# Install frontend deps
cd ../frontend && npm install
```

### 2. Environment Setup

```bash
cp .env.example backend/.env
cp .env.example frontend/.env
```

### 3. Start Databases

```bash
docker-compose up -d
```

### 4. Run Migrations + Seed

```bash
cd backend
npx prisma migrate dev --name init
npm run seed
```

### 5. Start Dev Servers

```bash
# Backend (port 3001)
cd backend && npm run dev

# Frontend (port 5173)
cd frontend && npm run dev
```

Open http://localhost:5173

## Features (MVP Phase 1)

- 🗓️ **Interactive Timeline** — Zoomable, filterable election event timeline
- 📋 **Process Breakdown** — 7-step election process with infographics
- 📝 **Quiz Engine** — Multiple choice quizzes with scoring & certificates
- ❓ **FAQ & Glossary** — Searchable knowledge base
- 👤 **User Auth** — JWT-based email/password authentication
- 📊 **Dashboard** — Personal progress tracking
- 📱 **Mobile Responsive** — Works on all screen sizes
