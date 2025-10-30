# React Todo App

A modern todo application built with React, Redux Toolkit, Material-UI, and Tailwind CSS.

## Features

### Task Management
- **Create Tasks**: Add new tasks using the form at the top of the application
- **Edit Tasks**: Click on any task or use the edit icon to modify task titles inline
- **Delete Tasks**: Remove tasks using the delete button
- **Toggle Completion**: Mark tasks as completed or incomplete using checkboxes

### Data Persistence
- **Local Storage**: All tasks are automatically saved to browser's local storage using Redux Persist
- **Load Test Data from API**: When the task list is empty, you can click the "Load from API" button to fetch sample test todos from JSONPlaceholder API. This loads 50 sample tasks that you can use to explore the application's features

### Pagination
- **Page Navigation**: Navigate through tasks using pagination controls
- **Customizable Page Size**: Choose how many tasks to display per page (5, 10, 20, 50, or 100)
- **Automatic Page Adjustment**: Page number automatically adjusts when filtering or changing page size

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Material-UI Components**: Modern and accessible UI components
- **Task Statistics**: View count of completed tasks vs total tasks
- **Empty State**: Helpful message when no tasks are present
- **Keyboard Support**: Edit tasks using Enter to save and Escape to cancel

### State Management
- **Redux Toolkit**: Centralized state management for todos
- **TypeScript**: Full type safety throughout the application
- **Optimized Performance**: Memoized components and efficient re-renders

## Project Structure

```
react-todo-app/
├── dist/                    # Production build output
├── node_modules/            # Dependencies
├── public/                  # Static assets
├── src/
│   ├── api/                 # API integration
│   │   └── todosApi.ts     # Todo API functions
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # React components
│   │   ├── Layout.tsx      # Main layout component
│   │   ├── PaginationControls.tsx
│   │   ├── TodoForm.tsx    # Form for creating/editing todos
│   │   ├── TodoItem.tsx    # Individual todo item component
│   │   └── TodoList.tsx    # List of todos component
│   ├── features/           # Feature-based modules
│   │   └── todos/          # Todo feature
│   │       ├── selectors.ts    # Redux selectors
│   │       ├── todosSlice.ts   # Redux slice
│   │       └── types.ts        # TypeScript types
│   ├── hooks/              # Custom React hooks
│   │   └── useTodos.ts     # Todo-related hooks
│   ├── store/              # Redux store configuration
│   ├── theme/              # Theme configuration
│   ├── utils/              # Utility functions
│   │   └── pagination.ts   # Pagination helpers
│   ├── App.tsx             # Main App component
│   ├── App.css             # App styles
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript app config
├── tsconfig.node.json      # TypeScript node config
└── vite.config.ts          # Vite configuration
```

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AndyDrewDev/react-todo-app.git
cd react-todo-app
```

2. Install dependencies:
```bash
npm install
```

## Launching the Project

### Development Mode

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port if 5173 is already in use).

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint:

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

