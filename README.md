# Hintro Frontend Assignment

## Submission Details
- **GitHub Repository**: `https://github.com/anmolsherawat/hintro-a.git`
- **Deployed Link**: [Insert your deployment link here, e.g., Vercel/Netlify URL]
- **Video Walkthrough**: [Insert your Loom/Drive video link here]
- **Assumptions & Notes**: See the "Assumptions & Decisions" section below.

## Overview
A modern, responsive dashboard built with React, TypeScript, and Tailwind CSS, following the Figma design end-to-end.

## Features
- **Authentication System**: Persistent login flow with user selection (u1/u2) to demonstrate different dashboard states.
- **Dashboard Layout**: Clean and modern design matching the Figma specification with "How it works" and "Recent Calls" sections.
- **Mock API Integration**: Dynamic data fetching from `https://mock-backend-hintro.vercel.app/` without hardcoding.
- **Full Page Suite**: Includes Call Insights, Knowledge Base, Prompts, and Boxy Controls.
- **Feedback System**: Functional feedback form with history stored in `localStorage`.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Themeable UI**: Built using CSS variables and Tailwind CSS for consistent styling.

## Tech Stack
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Utilities**: date-fns

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anmolsherawat/hintro-a.git
   cd hintro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Assumptions & Decisions
- **User Switching**: Integrated a dedicated Auth page to easily switch between `u1` (New User/Empty State) and `u2` (Active User/Populated State) as per requirements.
- **Persistent State**: Used `localStorage` for both Authentication (persisting selected user) and Feedback (persisting user submissions).
- **Empty States**: Implemented specific UI handling for user `u1` to show the "No Recent Calls" state and empty stats as seen in the design.
- **Data Formatting**: Stats like "Average Duration" are formatted from seconds into `Xm Ys` and relative dates (e.g., "2 days ago") for a professional UX.
- **Defensive Coding**: Added validation for API responses and date strings to prevent "white screen" crashes during runtime.

## Project Structure
- `src/components`: UI views and reusable components.
- `src/context`: Global state management for User/Auth.
- `src/services`: API communication layer using Axios.
- `src/types`: TypeScript interfaces for data consistency.
- `src/lib`: Utility functions.
