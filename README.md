# FORTRESS

> A kingdom built of habits.

Your existence is a fortress on a floating island. You are the monarch.
Four advisors run the four pillars of your life. Every real action you take
builds, defends, or decays the kingdom. You see it. In real time. Always.

- **Granary** — nutrition. The city eats.
- **Barracks** — strength. The body holds the walls.
- **Academy** — knowledge. The mind is a flame.
- **Embassy** — relationships. No fortress stands alone.

This is a daily-habit RPG built in Expo (React Native + iOS + Android, one
codebase) with a cozy isometric art style.

## Status

Step 1 of the MVP: **"The Fortress, standing still."** The app boots, shows
the static fortress, and lets you tap into any district. No persistence, no
backend, no AI yet — those come in Steps 2–4.

## Run it

```bash
npm install
npx expo start
```

Then press `i` for iOS Simulator, `a` for Android Emulator, or scan the QR
with Expo Go on a real phone.

## Plan

The full concept and MVP roadmap is in [`docs/CONCEPT.md`](./docs/CONCEPT.md).

## Repo layout

```
app/                   Expo Router screens
├── _layout.tsx        Root stack
├── index.tsx          The Fortress (home)
└── district/[id].tsx  District drill-down
src/
├── art/               Fortress SVG + palette
└── game/              Districts config + game-state types (Step 2)
```
