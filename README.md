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
├── vite.config.ts          # Vite configuration
├── Dockerfile              # Docker multi-stage build configuration
├── .dockerignore           # Docker ignore file
└── docker-compose.yml      # Docker Compose configuration
```

## Prerequisites

- Node.js (version 20.19+ or 22.12+ required for Vite)
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

### Docker Deployment

The project includes Docker configuration for easy deployment using multi-stage build.

#### Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

#### Building and Running with Docker Compose

The easiest way to run the application in Docker:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`.

To run in detached mode:

```bash
docker-compose up -d --build
```

To stop the container:

```bash
docker-compose down
```

#### Building and Running with Docker

Alternatively, you can build and run the Docker image directly:

```bash
# Build the image
docker build -t react-todo-app .

# Run the container
docker run -p 3000:80 react-todo-app
```

The application will be available at `http://localhost:3000`.

#### Docker Configuration

- **Dockerfile**: Multi-stage build using `node:20-alpine` for building and `nginx:alpine` for serving
- **.dockerignore**: Excludes unnecessary files from the build context
- **docker-compose.yml**: Simple configuration for running the application

The Docker setup:
1. Builds the React application using Node.js 20
2. Serves the production build using Nginx
3. Exposes the application on port 80 (mapped to port 3000 on the host)

#### Troubleshooting

If you encounter issues with rolldown native bindings on ARM architecture (Apple Silicon Macs), you can force the build to use x86_64 platform by uncommenting the `platform: linux/amd64` line in `docker-compose.yml`:

```yaml
build:
  context: .
  dockerfile: Dockerfile
  platform: linux/amd64  # Uncomment this line
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

