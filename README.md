# SOLID Principles

A TODO application demonstrating SOLID principles with Clean Architecture (backend) and Feature-Sliced Design (frontend).

## SOLID in Practice

The codebase applies SOLID principles as architectural decisions rather than isolated code patterns:

- **Single Responsibility** - Each layer and class has exactly one reason to change
- **Open/Closed** - The system extends through new modules, not by modifying existing ones
- **Liskov Substitution** - Parent abstractions never depend on their implementations
- **Interface Segregation** - Small, focused interfaces over broad ones
- **Dependency Inversion** - Business logic depends on abstractions, never on infrastructure

## Architecture

### Backend - Clean Architecture

Dependencies only point inward. Each module (`todo`, `user`) is self-contained:

```
modules/
  example/
    domain/          → Entities, Value Objects, Repository interfaces
    application/     → Use Cases, DTOs, Mappers
    presentation/    → Controllers, Routes
    infrastructure/  → PostgresTodoRepository
```

### Frontend - Feature-Sliced Design

Dependencies only point downward:

`app → pages → widgets → features → entities → shared`

## Tech Stack

**Backend:** Node.js, TypeScript, Express, PostgreSQL
**Frontend:** React, TypeScript, Zustand, Vite
**Infrastructure:** Docker, Docker Compose

## Deployment

### Dev
```bash
docker-compose up --build
```

Frontend served on port `5173`, backend on `3001`.

### Prod
```bash
docker-compose -f docker-compose.prod.yml up -d
```

Frontend and API served on port `81` through nginx.