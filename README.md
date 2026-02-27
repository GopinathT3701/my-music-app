# My Music App + Exam Platform Backend Scaffold

This repository now includes an exam platform backend scaffold using Node.js, Express, MySQL, JWT, and bcrypt.

## New backend module

Path: `exam-platform-backend/`

### Features included
- JWT auth (`/api/auth/register`, `/api/auth/login`)
- Exam APIs (`/api/exams`, `/api/exams/:id`, admin-only create exam)
- Test submission and result APIs (`/api/test/submit`, `/api/test/results/:userId`)
- Role-based middleware (`USER` and `ADMIN`)
- MySQL models for users, exams, questions, and results
- SQL schema file at `exam-platform-backend/schema.sql`

## Quick start

```bash
cd exam-platform-backend
cp .env.example .env
npm install
npm run dev
```

Server defaults to `http://localhost:5000`.
