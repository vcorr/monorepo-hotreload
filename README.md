# Todo app with React and Express
This is a simple example app featuring:
- monorepo setup using Turborepo
- trcp for type safety


## Turborepo based monorepo

This repository is based on the [docker example provided by Turborepo](https://github.com/vercel/turbo/tree/main/examples/with-docker), but modified to support **hot reloading**. It contains 2 applications, each setup to hot reload on code changes. The development images are not suitable for production.

## trcp

[trcp](https://trpc.io/) is a library that leverages TypeScript to make API calls type safe. To keep things simple, this project uses the simplest possible trcp setup without for example React Query specific tooling.

## Running

```
docker network create app_network

# Build
docker-compose build

# Start
docker-compose up
```

Open http://localhost:5173 for React app, the API will be running at http://localhost:3001.
Any change in code files will instantly trigger hot reload allowing fast development cycle.

**Current limitation:** If you make a breaking change in the API routes (change payload type for example), you must run `yarn dev` for the client to update and notify you on the correct way to call the updated API route. Docker-compose restart is not required.



