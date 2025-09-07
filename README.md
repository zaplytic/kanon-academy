# Kanon Academy: An Online Learning Platform for Bangladesh

Kanon Academy is a modern, full-stack online learning platform for hosting tutorials, designed to be a convenient and accessible space for both learners and tutors in Bangladesh. While it will offer a wide range of courses, from professional development to personal hobbies, the primary focus is not on revenue. Instead, the goal is to create a platform that prioritizes the needs and convenience of both educators and students, fostering a collaborative learning environment.

## Tech Stack

This project is a monorepo built with the following technologies:

- **Build Tool:** Nx
- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Package Manager:** Yarn Workspaces

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- Yarn
- Docker

It is also recommended to install the Nx CLI globally:

```bash
npm install -g nx
```

## Project Structure

The project is organized as a monorepo with the following structure:

```
/
├── apps/
│   ├── api/      # Backend Express.js application
│   └── web/      # Frontend React application
├── libs/
│   └── types/    # Shared TypeScript types and interfaces
└── package.json
```

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:zaplytic/kanon-academy.git
    cd kanon-academy
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**

    Navigate to `apps/api` and copy the `.env.example` file to a new file named `.env`.

    ```bash
    cp apps/api/.env.example apps/api/.env
    ```

    Update the `.env` file with your PostgreSQL database credentials.

4.  **Start the development servers:**

    You can serve the applications using the following commands:

    ```bash
    # Serve the backend API
    nx serve api

    # Serve the frontend web app
    nx serve web
    ```

5.  **Access the application:**

    The frontend will be available at `http://localhost:4200` and the backend will be available at `http://localhost:3000`. (Note: Nx's default port for React is 4200).

## Useful Nx Commands

Here are some other useful Nx commands to work with this monorepo:

- **Build:** `nx build <project-name>` (e.g., `nx build web`)
- **Test:** `nx test <project-name>` (e.g., `nx test api`)
- **Lint:** `nx lint <project-name>` (e.g., `nx lint web`)
- **Dependency Graph:** `nx graph` (This is a powerful command to visualize the dependencies between projects)
