# code-snippets

This repository contains a React + TypeScript study app for coding interview problems.

## Project Purpose

The app presents problems in two formats:

- `Reels` mode: a full-screen vertical snap experience, inspired by short-form video UIs
- `Traditional UI` mode: a topic-based browser with modal views for intuition and code

The current work has focused mainly on the reels experience.

## Repo Layout

- `code-snippets-react/`: main app source
- `docs/`: generated production site output used for deployment/hosting

## Important App Files

- `code-snippets-react/src/App.tsx`: top-level app shell, mode switch, traditional UI
- `code-snippets-react/src/App.css`: app-level layout and mode styling
- `code-snippets-react/src/data/studyReelProblems.ts`: reel problem data
- `code-snippets-react/src/components/snap-scroll-canvas/SnapScrollCanvas.tsx`: vertical reels container
- `code-snippets-react/src/components/snap-scroll-canvas/SnapScrollCanvas.css`: snap scrolling and reel slot sizing
- `code-snippets-react/src/components/study-reel-card/StudyReelCard.tsx`: single reel content and code modal
- `code-snippets-react/src/components/study-reel-card/StudyReelCard.css`: reel visual layout and footer actions
- `code-snippets-react/src/code-blocks/`: reusable problem/code snippet definitions

## Current Reel UX

Each reel is designed to behave like one full viewport item:

- one reel per snap slot
- no outer rounded frame container around the whole reel
- top content blocks for `Problem` and `Intuition`
- bottom footer with:
  - category shown as a circular badge plus label
  - a bottom-right `Code` action with a small icon and text below it
- clicking `Code` opens the existing modal popup with syntax-highlighted code

## Category Model

Categories are used differently in the two views:

- Traditional UI: simple string category such as `Arrays`, `Stack`, `DP`
- Reels UI: structured category with:
  - `short`: short badge text like `HM`, `ARR`, `STK`
  - `label`: full text like `Hash Map`, `Arrays`, `Stack`

## Build And Dev Commands

Run commands from `code-snippets-react/`.

- `pnpm dev`: start local dev server
- `pnpm run build:check`: type-check and validate the production build without writing repo build artifacts
- `pnpm build`: run the check, then generate the real production output in `docs/`
- `pnpm lint`: run ESLint
- `pnpm preview`: preview the built app

## Build Output Notes

- Vite is configured to build into `docs/`
- `build:check` writes temporary output to `/tmp/code-snippets-react-build-check`
- use `build:check` for normal verification during development
- use `build` only when you intentionally want fresh generated site files

## Known Context For Future Work

- The root `README.md` is intentionally being used as a lightweight project memory file
- Avoid unnecessary writes to `docs/` during routine checks
- Reel layout changes usually involve both:
  - `SnapScrollCanvas.css` for viewport/snap behavior
  - `StudyReelCard.css` for content sizing and footer placement
- Problem/category data for reels lives in `studyReelProblems.ts`
- Problem/category data for the traditional topic library currently lives in `App.tsx`
