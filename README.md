# Kanon Academy: An Online Learning Platform for Bangladesh

Kanon Academy is a modern, full-stack online learning platform designed to provide high-quality educational content to learners in Bangladesh. The platform will offer a wide range of courses, from professional development to personal hobbies, all tailored to the needs of the local market.

## Tech Stack

This project is a monorepo built with the following technologies:

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Package Manager:** Yarn Workspaces

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

To get started with this project, you will need to have Node.js, Yarn, and Docker installed on your machine.

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:zaplytic/kanon-academy.git
    cd kanon
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

    In one terminal, start the backend server:

    ```bash
    yarn workspace api dev
    ```

    In another terminal, start the frontend server:

    ```bash
    yarn workspace web dev
    ```

5.  **Access the application:**

    The frontend will be available at `http://localhost:5173` and the backend will be available at `http://localhost:3000`.
