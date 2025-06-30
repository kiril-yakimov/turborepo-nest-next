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

2.  **Run the Initial Setup Script:**
    This script will generate SSL certificates, create `.env` files, install all dependencies, and start the Docker containers with the development servers.
    ```sh
    ./.dev/scripts/init.sh
    ```

Once the script is finished, the development environment will be up and running.

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
