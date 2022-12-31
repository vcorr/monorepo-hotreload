# Turborepo based monorepo

This repository is based on the [example provided by Turborepo](https://github.com/vercel/turbo/tree/main/examples/with-docker), but modified to support **hot reloading**. It contains 2 applications, each setup to hot reload on code changes. The development images are not suitable for production.

## Running

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build
docker-compose build

# Start
docker-compose up
```

Open http://localhost:5173 for React app, the API will be running at http://localhost:3001.
