# FORTRESS — A Kingdom Built of Habits

## Context

You want to live inside your own life as a player would. Habit trackers feel
like spreadsheets; "Fortress" feels like opening a save file. Every meal, rep,
page read, and friend called is a brick in a living city. Skip a day and the
walls dim. String a week together and a new district rises.

The repo is essentially empty (just a `README.md` on the `main` branch). We're
building greenfield on `claude/fortress-life-game-concept-ETqsB`. This plan is
the concept document + concrete MVP we'll commit first, so you can react before
we write code.

> Note: I tried to sketch this on the tldraw canvas attached to this session,
> but the canvas backend didn't respond. Concept is captured in ASCII + prose
> below; we can re-render visually once the canvas is back, and the first code
> commit will include the in-app illustration that supersedes both.

---

## 1. The Fantasy (the one-sentence pitch)

> **Your existence is a fortress on a floating island. You are the monarch.
> Four advisors run the four pillars of your life. Every real action you take
> builds, defends, or decays the kingdom. You see it. In real time. Always.**

Not "log a workout." **Reinforce the Barracks.**
Not "eat a vegetable." **Stock the Granary.**
Not "read 10 pages." **Light a candle in the Academy.**
Not "text your sister." **Raise a banner on the Embassy.**

The reframe is the product.

---

## 2. The World

```
                           ░░ The Sky / Mood ░░
                  (clear · storm · aurora — reflects your week)

         ╔══════════════════════════════════════════════╗
         ║   ▲ Tower                       Tower ▲      ║   ◄ Outer Ramparts
         ║                                              ║      (your discipline)
         ║   ┌──────────┐         ┌──────────┐          ║
         ║   │ 🌾 GRANARY│         │ ⚔️ BARRACKS│         ║
         ║   │ nutrition │         │  fitness   │         ║
         ║   └──────────┘         └──────────┘          ║
         ║                ★  THRONE                     ║   ◄ You. Sleep, mood,
         ║                (YOU)                         ║      identity live here.
         ║   ┌──────────┐         ┌──────────┐          ║
         ║   │ 📜 ACADEMY│         │ 🤝 EMBASSY│         ║
         ║   │ knowledge │         │ relationships│      ║
         ║   └──────────┘         └──────────┘          ║
         ║                                              ║
         ║   ▲ Tower                       Tower ▲      ║
         ╚══════════════════════════════════════════════╝
                       ~~~  floating island  ~~~
                  (other fortresses visible on horizon)
```

### The 4 Districts (your pillars)

| District   | Pillar         | Resource | Earned by                                    |
| ---------- | -------------- | -------- | -------------------------------------------- |
| Granary  | Nutrition      | Grain  | logging meals, water, fasts, cooking         |
| Barracks | Body/Strength  | Iron   | workouts, walks, sleep, recovery             |
| Academy  | Knowledge      | Scrolls| reading, deep work, study, courses           |
| Embassy  | Relationships  | Banners| calls, visits, gifts, real conversations     |

Plus a hidden 5th: **The Throne** (mood, sleep, identity). Tap the throne, you
see *you* — avatar, current "Era," lifetime banners, the chapter you're in.

---

## 3. The Core Loop

The whole app is structured around three rhythms:

### Daily — "The Day at Court"

```
  ▒▒ Morning ▒▒          ▒▒ Midday ▒▒              ▒▒ Evening ▒▒
  The Council meets.     Quick-log from anywhere.   Reflection.
  4 advisors present     One-tap chips, voice note, Walk the walls — see
  3–5 decrees (quests)   photo of a meal or book.   what changed today.
  picked from your life.                            Night sky shows streaks
                                                    as constellations.
```

### Weekly — "The Audit"

Sunday-ish. The advisors give you one short, honest read on each pillar.
"Granary thrived this week — three home-cooked meals. Embassy is quiet — you
haven't called Maya since the 12th." One **Royal Decree** (1 ambitious weekly
quest) is set.

### Seasonal — "The Era"

Every ~3 months your fortress visually evolves: Bronze → Iron → Renaissance →
Modern → Solarpunk. Eras commemorate **chapters of your real life.** You name
them. ("The Move to Lisbon," "The Marathon Year.")

---

## 4. The Council (the AI layer — what makes this *feel alive*)

Four advisors, distinct personalities, powered by Claude. Each speaks only
about their domain, so the model stays focused and the voices stay sharp.

| Advisor         | Domain        | Voice                                          |
| --------------- | ------------- | ---------------------------------------------- |
| The Quartermaster | Granary    | warm, grandmotherly; talks about food + body fuel |
| The General      | Barracks     | crisp, encouraging drill-instructor; not mean  |
| The Sage         | Academy      | curious philosopher; asks what you're learning |
| The Diplomat    | Embassy       | gentle, attentive; remembers names + dates     |

They appear in the morning Council screen, in evening reflection, and when
you tap a district directly. They **remember context** (the marathon you're
training for, your mother's birthday next week, the book you started Tuesday)
via a small per-pillar memory store.

This is the killer feature: it's not "another habit app" — it's four
companions who know you, watching the city with you.

---

## 5. Mechanics that make it feel like a *game*

1. **Visible growth.** Every completed quest places a real prop: a tree, a
   citizen, a lit lantern, a sail in the harbor. You can point at things and
   remember when you earned them.
2. **Visible decay.** Neglect = visual cost. Crops wilt. Candles die. Banners
   fade. *Never punitive, always recoverable.* A single act revives a district.
3. **Weather = mood.** Streaks build clear skies; rough weeks bring rain or
   storms. (You can also set it manually — sometimes the sky *should* be grey.)
4. **Day/night cycle** matches your real local time. Open the app at 2am, it's
   2am in the kingdom; the throne room is candlelit.
5. **Banners.** Lifetime achievements hang on the walls. "First 5k." "30 days
   home-cooked." "Called Dad every Sunday for a year." They're physical.
6. **Constellations.** Your streaks form named stars in the night sky. Long
   streaks = brighter stars. Tap one to see its story.
7. **Setbacks count.** Recovery from a broken streak earns a unique banner
   ("The Return"). The app celebrates getting back, not just never falling.
8. **Trade routes (social).** Friends are other fortresses on the horizon.
   You can:
   - **Send a raven** (a short note + a small resource gift)
   - **Open a trade route** (mutual habit, e.g. workout buddy → both districts
     buff while route is active)
   - **Visit** their fortress (read-only tour with their permission)
   - *No leaderboards. No shaming.* Comparison is opt-in only.

---

## 6. App Surface (mobile screens — MVP)

```
┌───────────────────────────┐    ┌───────────────────────────┐    ┌───────────────────────────┐
│  THE FORTRESS (home)      │    │  GRANARY (district drill) │    │  THE COUNCIL (morning)    │
│                           │    │                           │    │                           │
│   ☁️  ☁️    ⭐ ⭐ ⭐         │    │   🌾 GRANARY · LV 4       │    │  Quartermaster:           │
│      [ isometric city ]   │    │   ▓▓▓▓▓▓▓░░░  78%         │    │  "Three meals at home     │
│   🌾 ⚔️                   │    │                           │    │   this week. Strong."     │
│   ★  ←  YOU               │    │   Today's Decrees:        │    │                           │
│   📜 🤝                   │    │   ☐ Eat 30g protein @ AM  │    │  General:                 │
│                           │    │   ☐ Drink 2L water        │    │  "Legs day. 25 min, fast."│
│  Decrees: 2/5 done        │    │                           │    │                           │
│  Streak: 🔥 11d           │    │   Recent: 🍳 omelet, 🥗   │    │  Sage:                    │
│                           │    │                           │    │  "Page 47 awaits."        │
│  [+ Quick log]            │    │   [+ Log meal]            │    │                           │
└───────────────────────────┘    └───────────────────────────┘    │  Diplomat:                │
                                                                  │  "Maya's birthday in 3d." │
                                                                  │                           │
                                                                  │  [ Accept Decrees ]       │
                                                                  └───────────────────────────┘
```

**Quick-log** is the most-used interaction. From the home screen, one tap →
a sheet with 4 chips (one per district). Pick a district, the sheet morphs
into the right input (photo for meal, timer for workout, page count, contact
picker). 5 seconds, dismiss, watch the fortress react.

---

## 7. Art Direction

**Style:** cozy isometric — think *Monument Valley* meets *Townscaper* meets
a Studio Ghibli storybook. Warm earth palette + jewel accents (gold throne,
indigo scrolls, deep green banners).

**Why isometric:** the camera angle makes every prop legible at a glance
without needing 3D. We can ship it as layered SVG/PNG before ever touching a
3D pipeline.

**Motion:** subtle and ambient — chimney smoke, fluttering flags, a citizen
walking the wall. Nothing demands attention; the city just *breathes*.

**Sound (optional, off by default):** wind, distant bells, hammer on anvil.
Council advisor lines could be voiced as a Phase 2 add.

**Tone:** *cozy, dignified, never punitive.* No red exclamation marks. No
"you failed." A neglected district just looks tired and wants to be visited.

---

## 8. Tech Stack (proposed — open to discussion)

| Layer        | Choice                                | Why                              |
| ------------ | ------------------------------------- | -------------------------------- |
| Mobile app   | **Expo (React Native, TypeScript)**   | iOS + Android in one tree, OTA updates, great DX |
| State        | Zustand + local-first storage (MMKV)  | offline works, sync later        |
| Backend      | **Supabase** (Postgres + auth + realtime) | one-stop, generous free tier |
| AI Council   | **Claude API** (`claude-opus-4-7` for weekly audits, `claude-haiku-4-5` for daily) with prompt caching | per-advisor system prompts cached; cheap day-to-day |
| Art          | hand-illustrated SVG layers + Lottie  | swap PNGs to upgrade visuals later |
| Push         | Expo Notifications                    | morning Council, evening reflection |

Everything in the MVP is free-tier friendly. AI cost target: <$0.01/user/day
with caching on the advisor system prompts.

---

## 9. MVP — what we actually build first

We'll commit in four small, demoable steps. Each leaves a working app.

### Step 1 — "The Fortress, standing still" (1–2 days)
- Expo app scaffolded, single home screen
- Static illustration of the fortress (4 districts visible, throne center)
- Tapping a district opens its placeholder detail screen
- No backend, no AI yet — but it *looks* like the game already

### Step 2 — "The Quick-Log" (2–3 days)
- The 4-chip quick-log sheet wired up
- Local persistence (MMKV) of logged actions
- Each district shows a level + XP bar fed by your logs
- The home illustration swaps in 1 new prop per level (tree, lantern, banner)

### Step 3 — "The Council speaks" (3–4 days)
- Morning Council screen with 4 advisors
- Each advisor calls Claude API with a domain-scoped system prompt + your
  recent logs (cached prompts!)
- Daily Decrees generated and accepted into the home screen
- Evening reflection screen — the advisors comment on the day

### Step 4 — "Streaks, decay, and the night sky" (2–3 days)
- Per-district streak tracking + visible decay state
- Day/night cycle in the illustration matches device time
- Night-sky constellation view of active streaks
- First proper banner unlocks (e.g. "Seven Suns in the Granary")

Anything beyond this — Supabase sync, friends/ravens, eras, sound — is post-MVP.

---

## 10. Repo Structure (what the first commit will lay down)

```
FORTRESS/
├── app/                        # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx           # The Fortress (home)
│   │   ├── council.tsx         # Morning Council
│   │   └── throne.tsx          # You / profile
│   └── district/[id].tsx       # drill-down (granary, barracks, etc.)
├── src/
│   ├── game/                   # game-state logic (XP, streaks, decay)
│   ├── council/                # advisor prompts + Claude API calls
│   │   ├── quartermaster.ts
│   │   ├── general.ts
│   │   ├── sage.ts
│   │   └── diplomat.ts
│   ├── art/                    # SVG/illustration components + variants
│   └── store/                  # Zustand stores, MMKV persistence
├── assets/                     # illustrations, fonts, sounds
├── docs/CONCEPT.md             # this plan, lightly edited
└── README.md
```

Reuse target: there's nothing meaningful in the repo yet, so we're not
reusing internal code — but we **will** lean on a couple of existing libs
hard: `react-native-svg` for the layered fortress art, `expo-router` for
navigation, and the official `@anthropic-ai/sdk` with prompt caching for
the Council layer (the `claude-api` skill in this environment is a good
reference for setting that up cleanly).

---

## 11. Naming + voice

- **App:** FORTRESS (caps, serif — like a banner)
- **Tagline:** "A kingdom built of habits."
- **Each user has a House** ("House of Noor") and names their fortress
  (e.g. "Highkeep," "The Aurorae")
- **In-app voice:** quietly grand. We say *decree,* not *task.*
  *Ramparts,* not *progress bar.* *Audit,* not *weekly review.*

---

## 12. Verification (how we'll know it works)

After each MVP step:

1. **Run on device** via `npx expo start` and Expo Go (iOS + Android both,
   so we catch platform drift early). The `run` skill in this environment
   covers launching mobile apps.
2. **Manual playthrough script** for each step:
   - Step 1: open app → see fortress → tap each district → return home
   - Step 2: log one action per district → verify XP bar moves + a prop
     appears in the illustration → kill + relaunch the app → state persists
   - Step 3: open Council → verify each advisor returns a tailored decree;
     decline + regenerate; accept and confirm decrees populate the home
   - Step 4: simulate 7 days passing (a debug button) → confirm decay
     visuals + streak constellations appear correctly
3. **AI cost check:** after Step 3, look at the Anthropic dashboard for the
   advisor calls; confirm prompt-cache hit rate >80% on the system prompts.

---

## 13. Decisions locked

You picked the four recommended defaults:

| Decision        | Choice                                              |
| --------------- | --------------------------------------------------- |
| Platform        | **Expo (iOS + Android)** — one codebase             |
| Art direction   | **Cozy isometric** — layered SVG, Townscaper vibe   |
| AI Council      | **Real Claude API from Step 3** — cached per-advisor system prompts |
| Storage         | **Local-only MVP** (MMKV) — Supabase added post-MVP |

Implication for Step 3: I'll need either an `ANTHROPIC_API_KEY` in the env
or in `app.config.ts` via Expo Secrets before the Council goes live.
I'll scaffold the call sites + stubs in Step 2 so Steps 1–2 don't require
the key, and Step 3 swaps the stubs for real calls.
