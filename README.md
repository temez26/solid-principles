# SOLID Principles

This repository contains a basic TODO application demonstrating the SOLID principles and with architectural patterns.

## Architecture

### Backend
- **Domain-Driven Design (DDD)** – Core business logic isolated from infrastructure
- **Clean Architecture** – Dependency inversion with layered separation

### Frontend
- **Feature-Sliced Design (FSD)** – Scalable modular architecture
- **Component-driven** – Reusable UI components with clear responsibilities

## Tech Stack

**Backend:** Node.js, TypeScript, Express, PostgreSQL  
**Frontend:** React, TypeScript, Zustand, Vite  
**Infrastructure:** Docker, Docker Compose

## Deployment

### Dev
```bash
docker-compose -f docker-compose.dev.yml up -d
```

Frontend served on port `5173`, backend on `3001`.

### Prod
```bash
docker-compose -f docker-compose.prod.yml up -d
```

Frontend served on port `81`, backend on `3001`.