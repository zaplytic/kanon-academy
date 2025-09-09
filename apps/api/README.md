# API (@kanon-academy/api)

This application contains the backend API for the project, built with Express.

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
nx serve api
```

The server will be running on `http://localhost:3000`.

## Testing

To run the tests for the API:

```sh
nx test api
```

## Building

To create a production-ready build:

```sh
nx build api
```

The output will be in the `dist/apps/api` directory.
