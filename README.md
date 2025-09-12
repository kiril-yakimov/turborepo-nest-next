# Turborepo Nest.js & Next.js Monorepo Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-E6552A?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/repo)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)

A comprehensive starter kit for building modern web applications using a powerful monorepo setup. This project integrates a Nest.js backend, a Next.js frontend, and a documentation site, all managed by Turborepo for efficient development and scaling.

## ✨ Features

- **Monorepo:** Managed with [Turborepo](https://turbo.build/repo) for optimized build and development workflows.
- **Backend:** A robust API built with [Nest.js](https://nestjs.com/), including:
  - **ORM:** [Mikro-ORM](https://mikro-orm.io/) for seamless database interactions with PostgreSQL.
  - **Authentication:** [Keycloak](https://www.keycloak.org/) integration for secure access control.
  - **Task Queues:** [BullMQ](https://bullmq.io/) for handling background jobs.
  - **Logging:** [Winston](https://github.com/winstonjs/winston) for structured logging.
- **Frontend:** A fast and modern user interface built with [Next.js](https://nextjs.org/).
- **Documentation:** A separate [Next.js](https://nextjs.org/) site for project documentation.
- **Shared UI:** A `ui` package for reusable React components across applications.
- **Configuration:** Centralized `eslint` and `typescript` configurations for consistency.
- **Containerization:** A complete Docker setup using `docker-compose` for a consistent development environment.

## 🛠️ Tech Stack

| Technology     | Description                                                                                     |
| :------------- | :---------------------------------------------------------------------------------------------- |
| **Turborepo**  | High-performance build system for JavaScript and TypeScript monorepos.                          |
| **Nest.js**    | A progressive Node.js framework for building efficient, reliable server-side applications.      |
| **Next.js**    | The React framework for production.                                                             |
| **PostgreSQL** | A powerful, open-source object-relational database system.                                      |
| **Keycloak**   | Open-source Identity and Access Management.                                                     |
| **BullMQ**     | A robust and fast job queue system for Node.js.                                                 |
| **Docker**     | A platform for developing, shipping, and running applications in containers.                    |
| **Yarn**       | Fast, reliable, and secure dependency management.                                               |
| **TypeScript** | A typed superset of JavaScript that compiles to plain JavaScript.                               |
| **ESLint**     | Pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. |
| **Prettier**   | An opinionated code formatter.                                                                  |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [Yarn](https://yarnpkg.com/) (v4.x)
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/turbotepo-nest-next.git
    cd turbotepo-nest-next
    ```

2.  **Hosts Entries:** Add local domains for reverse proxy and TLS.
    - `127.0.0.1 auth.application.int web.application.int docs.application.int api.application.int`

3.  **Run the Initial Setup Script:**
    This script will generate SSL certificates, create `.env` files, install all dependencies, and start the Docker containers with the development servers.
    ```sh
    yarn setup
    ```

Once the script is finished, the development environment will be up and running.

### Environment Variables

Backend (NestJS API): `apps/api/.env` (created from example). Required Keycloak values:

- `KEYCLOAK_URL=https://auth.application.int`
- `KEYCLOAK_REALM=application_realm`
- `KEYCLOAK_CLIENT_ID=api-client`
- `KEYCLOAK_CLIENT_SECRET=replace_with_api_client_secret`
- `KEYCLOAK_REALM_PUBLIC_KEY=realm_public_key_here`

Frontend (Next.js Web): create `apps/web/.env.local` or copy from `apps/web/.env.example`:

- `KEYCLOAK_ID=web-client`
- `KEYCLOAK_SECRET=replace_with_keycloak_web_client_secret`
- `KEYCLOAK_ISSUER=https://auth.application.int/realms/application_realm`

### Keycloak Setup

1. Create realm: `application_realm`.
2. Create confidential client for API (`api-client`):
   - Enable Direct Access Grants and Service Accounts.
   - Copy client secret to API `.env` (`KEYCLOAK_CLIENT_SECRET`).
   - Service account roles: at minimum `realm-management: manage-users, view-users`.
3. Create confidential client for Web (`web-client`):
   - Valid Redirect URIs: `https://web.application.int/api/auth/callback/keycloak`
   - Web Origins: `https://web.application.int`
   - Copy client secret to Web `.env.local`.
4. Copy Realm public key (RS256) to API `.env` as `KEYCLOAK_REALM_PUBLIC_KEY`.

### Local Domains

Nginx proxies:
- API: `https://api.application.int` → NestJS (`nestjs:3000`)
- Auth: `https://auth.application.int` → Keycloak (`keycloak:8080`)
- Web: `https://web.application.int` → Next.js (`web:3001`)
- Docs: `https://docs.application.int` → Next.js (`docs:3002`)

### Database Migration

Apply Mikro-ORM migrations to ensure the `users` table uses `external_auth_id`:

```sh
yarn workspace api mikro-orm migration:up
```

## 📜 Available Scripts

- `yarn dev`: Starts all applications in development mode.
- `yarn build`: Builds all applications for production.
- `yarn lint`: Lints the entire monorepo.
- `yarn format`: Formats the code using Prettier.
- `yarn check-types`: Runs TypeScript type checks.

For application-specific commands, use `yarn workspace <app-name> <command>`. For example:

- `yarn workspace api test`: Runs unit tests for the API.
- `yarn workspace api mikro-orm migration:create`: Creates a new database migration.

## 📂 Project Structure

```
.
├── apps
│   ├── api/         # Nest.js API
│   ├── web/         # Next.js web application
│   └── docs/        # Next.js documentation site
├── packages
│   ├── ui/          # Shared React components
│   ├── eslint-config/ # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── ...
```

## 🔐 Auth Endpoints (Public)

- POST `https://api.application.int/v1/auth/register` — Creates user in Keycloak + local DB, returns tokens.
- POST `https://api.application.int/v1/auth/login` — Direct Grant exchange, returns tokens.
- POST `https://api.application.int/v1/auth/refresh-token` — Refreshes tokens.

Local user persistence uses `externalAuthId` (Keycloak user id). A migration is included to align DB column names accordingly.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
