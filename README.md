# SupportPilot

An event-driven AI-powered support ticket triage system built using Node.js, TypeScript, PostgreSQL, Redis and modern AI technologies.

## Project Goals

SupportPilot aims to automate customer support ticket processing through:

- Webhook-based ticket ingestion.
- Asynchronous event processing.
- Idempotent event handling.
- AI-powered ticket classification and prioritization.
- Knowledge-base retrieval using embeddings.
- Human approval workflows.
- AI evaluation and performance measurement.

## Technology Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Knex.js
- Redis
- BullMQ
- Next.js
- LLM APIs
- Docker

## Local Development

Docker is used to run PostgreSQL and Redis independently of other local projects.

Start the services:

```bash
docker compose up -d
```

Check their status:

```bash
docker compose ps
```

Stop the services:

```bash
docker compose down
```

## Documentation

Detailed project setup, commands, explanations and verification steps are available here:

[Project Setup and Development Log](docs/PROJECT_SETUP.md)

## Project Status

Initial project setup and Docker infrastructure completed. Backend database integration and application features are under development.