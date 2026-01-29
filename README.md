# 🏒 FLOW — Project Context

**Flow** is a **modular, algorithm-driven hockey intelligence feed**.  
It aggregates hockey data, converts it into structured events, ranks them, and displays them in an infinite personalized feed.

This is a **feed engine**, not just a scores app.

---

## Core Concept

> **Everything becomes a `FeedEvent`**

Scores, highlights, fantasy alerts, streaks, trends, analytics — all normalized into one event format.

---

## Architecture

DATA SOURCES → FEED MODULES → FEED ENGINE → ANGULAR UI

- **Feed Modules**: Independent units that detect something interesting and emit events
- **Feed Engine**: Aggregates + ranks events
- **Frontend**: Renders events by type
- **Shared Library (`flow-shared`)**: DTOs and contracts

System is **module-based** for long-term extensibility.

---

## Tech Stack

- Monorepo (workspaces)
- **Backend**: NestJS
- **DB**: Postgres (Docker local, Neon dev/prod)
- **ORM**: Prisma
- **Frontend**: Angular
- **Hosting**: Render
