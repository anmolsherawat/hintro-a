# Hintro Dashboard

A clean, responsive dashboard built for the Hintro Frontend Assessment.

**Live Demo**: [https://hintro-a.vercel.app/](https://hintro-a.vercel.app/)

## Features
- **Dual User States**: Support for `u1` (empty/new) and `u2` (active/populated) via a custom Auth selection.
- **Dynamic Dashboard**: Real-time data fetching from Hintro mock APIs (Sessions, Duration, AI Usage).
- **Recent Calls**: Grouped by date with detailed meeting information.
- **Full Suite**: Call Insights, Knowledge Base, Prompts, and Boxy Controls.
- **Persistence**: User sessions and feedback history stored in `localStorage`.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS (Styling)
- Lucide React (Icons)
- Axios (API)
- date-fns (Date formatting)

## Setup
1. `npm install`
2. `npm run dev` (Development)
3. `npm run build` (Production)

## Assumptions
- Used `localStorage` to mock persistent authentication and feedback storage.
- Implemented defensive checks for all API responses to ensure UI stability.
