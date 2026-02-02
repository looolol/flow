# 🏒 FLOW — System Roadmap

**FLOW = Modular Hockey Intelligence Feed**  
Goal: Transform raw hockey data into ranked, structured feed events.

Architecture:
DATA SOURCES → FEED MODULES → FEED ENGINE → UI

---

## ✅ PHASE 1 — Core Feed Loop (CURRENT)

**Goal:**  
Establish the foundational pipeline:

> Data → State → Event → Feed

---

### 🧱 Data Hydration Foundation

- [X] Create **SystemState** tracking
    - lastScheduleSync
    - lastScoreSync
    - syncLock

- [X] Build unified **/sync** endpoint
- [ ] Add sync lock to prevent duplicate NHL calls
- [X] Add freshness checks before external API calls

---

### 🏒 Schedule Pipeline

**Goal: Games exist in DB**

- [X] Implement NHL `schedule/today` ingestion
- [X] Transform NHL data → internal Game model
- [X] Upsert games (no duplicates)

Store:
- startTime
- homeTeamId
- awayTeamId
- gameState

**Rules**
- If no games for today → fetch
- OR lastScheduleSync > ~12h

---

### 🥅 Score Update Pipeline

**Goal: Games become live, changing objects**

- [X] Implement NHL `scores/now` ingestion
- [X] Store:
    - [X] homeScore
    - [X] awayScore
    - period
    - clock

**Rules**
- Only run if LIVE games exist
- Cooldown between calls (~30–60s)

---

### 🧢 Teams (Light Seed)

**Goal: Replace team IDs with real info**

- [X] Teams table
- [X] Store:
    - name
    - abbreviation
    - logo
- [X] Map Game → Team relation

---

### 📰 FeedEvent System (Minimal)

**Goal: Games produce feed items**

- [ ] Create FeedEvent table

Emit events when:
- [ ] Game created → `GAME_SCHEDULED`
- [ ] Game turns LIVE → `GAME_START`
- [ ] Score changes → `GAME_UPDATE`
- [ ] Game ends → `GAME_FINAL`

---

### 🔌 API Separation

- [ ] `/sync` → data hydration only
- [ ] `/games` → raw game data
- [ ] `/feed` → FeedEvents only

---

### 🖥 Frontend Wiring

- [X] Call `/sync` on app load
- [ ] Poll `/sync` when LIVE games exist
- [ ] Switch UI to `/feed` endpoint
- [ ] Render:
    - team names
    - logos
    - scores
    - game state

---

## 🔜 PHASE 2 — Feed Intelligence

- [ ] Event importance scoring
- [ ] Ranking logic
- [ ] Deduplication
- [ ] Time decay

---

## 🧠 PHASE 3 — Personalization

- [ ] User preferences
- [ ] Team affinity weighting
- [ ] Interaction-based ranking
- [ ] Fantasy relevance

---

## 🚀 PHASE 4 — Advanced Modules

Future intelligence modules:
- Streak detection
- Player performance trends
- Goalie hot/cold detection
- Betting signals
- Historical milestones

---

## 🧩 Core System Principle

FLOW is not a scores app.

FLOW is an **event intelligence engine** where:

> State changes → Events → Ranked feed

Everything plugs into this loop.
