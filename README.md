# Hintro Frontend Assignment

A modern, responsive dashboard built with React, TypeScript, and Tailwind CSS.

## Features
- **Dashboard Layout**: Clean and modern design matching the Figma specification.
- **Mock API Integration**: Fetches data from `https://mock-backend-hintro.vercel.app/`.
- **User Switching**: Support for multiple users (`u1` and `u2`) to demonstrate empty and populated states.
- **Feedback System**: Functional feedback form with history stored in `localStorage`.
- **Responsive Design**: Mobile-friendly sidebar and grid layouts.
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
- **User Switching**: I added a user toggle in the header to easily switch between `u1` (new user/empty state) and `u2` (active user/filled state) as requested.
- **Feedback**: Stored in `localStorage` as `hintro_feedback`.
- **Empty States**: Specifically handled for `u1` to show the "No Recent Calls" state as seen in the Figma design.
- **Stats Handling**: Time stats (duration) are formatted from seconds into `Xm Ys` format for better readability.

## Project Structure
- `src/components`: UI components (Sidebar, Header, StatsCard, etc.)
- `src/context`: State management (UserContext)
- `src/services`: API communication logic
- `src/types`: TypeScript interfaces
- `src/lib`: Utility functions (Tailwind merge)
