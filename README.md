# AI Incremental Game

A React-based incremental game with an AI theme, built using modern web technologies.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Big.js** for handling large numbers
- **ESLint** and **Prettier** for code quality

## Features

- Error boundary for graceful error handling
- Redux store with typed hooks
- Responsive design with Tailwind CSS
- Support for large numbers with Big.js

## Getting Started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the development server:

   ```bash
   yarn dev
   ```

3. Open your browser and navigate to the local development URL (usually `http://localhost:5173`)

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code with Prettier

## Project Structure

```
src/
├── components/          # React components
│   ├── ErrorBoundary.tsx
│   └── HelloWorld.tsx
├── store/              # Redux store
│   ├── hooks.ts        # Typed Redux hooks
│   ├── slices/         # Redux slices
│   └── store.ts        # Store configuration
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```
