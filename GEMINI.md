# Project Overview for Gemini

This is a Turborepo monorepo project.

## Project Structure

*   **`apps/api`**: NestJS API written in TypeScript.
    *   **Frameworks/Libraries**: NestJS, Mikro-ORM (for PostgreSQL), Nest-Keycloak-Connect, BullMQ, Winston.
    *   **Database**: PostgreSQL.
    *   **Authentication**: Keycloak.
    *   **Task Queue**: BullMQ.
    *   **Logging**: Winston.
*   **`apps/web`**: Next.js frontend application written in TypeScript.
*   **`apps/docs`**: Next.js documentation site written in TypeScript.
*   **`packages/ui`**: Shared React UI components.
*   **`packages/eslint-config`**: Shared ESLint configurations.
*   **`packages/typescript-config`**: Shared TypeScript configurations.

## Development Environment

The project uses Docker Compose for local development services, including:
*   PostgreSQL database.
*   Nginx as a reverse proxy.
*   Node.js environments for applications.

## Key Commands

All commands should be run from the project root directory (`/Users/kirilyakimov/Documents/Personal/turbotepo-nest-next`).

### Root Commands (Turborepo)

*   `yarn install`: Installs all dependencies for the monorepo.
*   `yarn dev`: Starts all applications (API, Web, Docs) in development mode.
*   `yarn build`: Builds all applications for production.
*   `yarn lint`: Lints all codebases.
*   `yarn format`: Formats code using Prettier.
*   `yarn check-types`: Runs TypeScript type checks across all projects.

### Application-Specific Commands

To run commands for a specific application, use `yarn workspace <app-name> <command>`.

**`apps/api` (NestJS API)**
*   `yarn workspace api dev`: Starts the API in development mode with hot-reloading.
*   `yarn workspace api test`: Runs unit tests for the API.
*   `yarn workspace api test:e2e`: Runs end-to-end tests for the API.
*   `yarn workspace api mikro-orm migration:create`: Creates a new database migration file.
*   `yarn workspace api mikro-orm migration:up`: Applies pending database migrations.

**`apps/web` (Next.js Frontend)**
*   `yarn workspace web dev`: Starts the web application in development mode.
*   `yarn workspace web build`: Builds the web application for production.

**`apps/docs` (Next.js Documentation)**
*   `yarn workspace docs dev`: Starts the documentation site in development mode.
*   `yarn workspace docs build`: Builds the documentation site for production.

## Important Notes for AI Agent

*   **Initial Setup**: For the first-time setup of the project, use the `./.dev/scripts/init.sh` script. This will generate the necessary SSL certificates, create the `.env` files, and start the Docker containers.
*   **Environment Variables**: Never read the `.env` files directly. The `init.sh` script handles their creation, and the `docker-compose.yml` file manages their use in the containers.
*   **Package Manager**: Always use `yarn` (specifically Yarn 4.x) for installing dependencies and running scripts.
*   **File Paths**: When modifying files, ensure you use absolute paths.
*   **Conventions**: Adhere to existing code style, formatting, and architectural patterns found in the project.
*   **Database Migrations**: For database schema changes, use Mikro-ORM migrations via `yarn workspace api mikro-orm migration:create` and `yarn workspace api mikro-orm migration:up`.
*   **Testing**: Prioritize running existing tests (`yarn workspace <app-name> test` or `yarn workspace <app-name> test:e2e`) after making changes, especially for the API.
*   **Linting/Formatting**: Always run `yarn lint` and `yarn format` before considering changes complete.
*   **Type Checking**: Use `yarn check-types` to ensure type safety.

### Process

1. Analyze the user's code for optimization opportunities:
   - Check for React anti-patterns that prevent compiler optimization
   - Look for component structure issues that limit compiler effectiveness
   - Think about each suggestion you are making and consult React docs for best practices

2. Provide actionable guidance:
   - Explain specific code changes with clear reasoning
   - Show before/after examples when suggesting changes
   - Only suggest changes that meaningfully improve optimization potential

### Optimization Guidelines

- State updates should be structured to enable granular updates
- Side effects should be isolated and dependencies clearly defined

## Comments policy

Only write high-value comments if at all. Avoid talking to the user through comments.
