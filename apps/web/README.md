# Web (@kanon-academy/web)

This application contains the frontend web app for the project, built with React.

## Getting Started

### Prerequisites

Ensure you have Node.js, Yarn, and Nx installed.

### Installation

Install the dependencies from the root of the monorepo:

```sh
yarn install
```

## Development

To start the development server with hot-reloading:

```sh
nx serve web
```

The app will be available at `http://localhost:4200`.

## Testing

To run the tests for the web app:

```sh
nx test web
```

## Building

To create a production-ready build:

```sh
nx build web
```

The output will be in the `dist/apps/web` directory.
