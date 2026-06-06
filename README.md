<<<<<<< HEAD
# LDM — Lead Dashboard System

A production-grade **Leads Management UI** built with Next.js, TypeScript, and Tailwind CSS — architected using **Clean Architecture** principles.

## 🏗️ Architecture

This project follows Clean Architecture with 4 distinct layers:

```
Presentation → Application → Domain ← Infrastructure
```

- **Domain** — Core entities, repository interfaces, value objects. Zero external dependencies.
- **Application** — Use cases, services, validators. Orchestrates domain logic using `Result<T>` pattern.
- **Infrastructure** — Concrete implementations. In-memory repository with TTL cache and Singleton pattern.
- **Presentation** — Next.js pages, React components, custom hooks.

### Key Patterns Used
- ✅ Repository Pattern (`ILeadRepository`)
- ✅ Result\<T\> Pattern (no thrown errors — every use case returns success or failure)
- ✅ In-Memory Cache with 5-minute TTL + Singleton
- ✅ AuditableEntity base class (DDD) with `createdBy`, `createdOn`, `updatedBy`, `updatedOn`
- ✅ Zod validation on all form inputs
- ✅ Optimistic UI updates on status change

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
  domain/          → Entities, interfaces, value objects (no external deps)
  application/     → Use cases, services, Zod validators
  infrastructure/  → InMemoryRepository, LeadCache, mock data
  presentation/    → Components, hooks, Next.js pages
  app/             → Next.js App Router (pages + API routes)
__tests__/         → Unit tests (Jest + ts-jest)
```

## ✅ Features

- [x] Leads list with table layout
- [x] Loading / Empty / Error states
- [x] Filter by status
- [x] Search by name or email
- [x] Sort by created date (asc/desc)
- [x] Lead detail page
- [x] Status update with optimistic UI
- [x] Add lead form with Zod validation
- [x] In-memory cache with TTL (5 min) + Singleton
- [x] Next.js API routes (GET, POST, PATCH)
- [x] Unit tests (GetLeads, CreateLead use cases)
- [x] Fully typed — zero `any`
- [x] Clean Architecture — 4 layers, strict dependency direction

## 💭 Assumptions

- Mock data seeded in `src/infrastructure/repositories/data/leads.json`
- In-memory cache TTL is 5 minutes; resets on create
- No authentication required for this assignment
- `createdBy` defaults to `"user"` in the form
- Status options: `new`, `contacted`, `qualified`, `lost`

## ⏱️ Time Spent

| Part | Time |
|------|------|
| Architecture + domain layer | ~1 hr |
| Infrastructure (cache, repo) | ~45 min |
| Application (use cases, hooks) | ~1 hr |
| UI components + pages | ~1.5 hr |
| Debugging API route errors | ~30 min |
| Tests + README | ~30 min |
| **Total** | **~5.5 hrs** |

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (utility-first styling)
- **Zod** (schema validation)
- **Jest + ts-jest** (unit testing)
- **uuid** (unique ID generation)
=======
# Leads_Management_System_LMS
>>>>>>> 2ccf986b0b4788457f2c54ed9e253b32dd5b22f6
