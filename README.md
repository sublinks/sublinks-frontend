# Sublinks Frontend
This is the default frontend for the Sublinks project. It's built using the NextJS framework and React library.

Together with the [Sublinks Core](https://github.com/participating-online/sublinks) and [Sublinks Federation](https://github.com/participating-online/sublinks-federation) it's creating a federated link aggregation and microblogging platform.

## Contributing

### Developer Guidelines

[CONTRIBUTING.md](CONTRIBUTING.md)

### Feature Requests / Bugs

Please post any feature requests or bug reports in the repository's [Issues section](https://github.com/participating-online/sublinks-frontend/issues).

## Developing

### NextJS Telemetry

Before you start be aware that NextJS has started collecting telemetry data when using it.  
Here's how you can opt-out: https://nextjs.org/telemetry#how-do-i-opt-out

### Prerequisites

* Node version >=20.0.0
* NPM version >=9.0.0

**Install dependencies**
```sh
  npm i
```

### Environment Setup

To run this project, you need to set up the necessary environment variables. A template for these variables can be found in the `.env.example` file.

### Docker

A Docker Compose configuration is made available. This provides an environment which contains a real connection to the Sublinks API and other services. As close to a production-like environment we can test and develop towards locally.

To use this Docker setup you first need to authenticate towards GitHub's container registry(GHCR). Please follow [this guide](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic) to create an access token and authenticate before running the below command.

**Run Docker services**
```sh
  npm run dev:docker
```

This will expose a NextJS dev environment at http://localhost:3000. It also runs a seeding script which inserts several data entities on startup. To give you something to work with, without having to manually create users and such.

### Non-Docker

**Run dev server**
```sh
  npm run dev
```

This will expose a NextJS dev environment at http://localhost:3000. It makes no API requests and instead uses a couple test data files.

## Testing

**Lint**
```sh
  npm run lint
```

**Unit Tests**
```sh
  npm run test:unit
  npm run test:unit:watch
```

**E2E Tests**
```sh
  TBD
```

## Deploying
TBD
