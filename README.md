# Mini Audit Tracker

A simple audit workflow application for tracking observations and their resolution status.

## Features

- Create and manage audit observations
- Assign observations to team members
- Track observation status (Open, In Progress, Closed)
- Filter and sort observations
- Upload and preview supporting evidence
- View status distribution chart
- Responsive design with Tailwind CSS

## Tech Stack

- React with TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- LocalStorage for data persistence

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd mini-audit
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## License

MIT
