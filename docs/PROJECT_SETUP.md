# SupportPilot – Project Setup and Development Log

## 1. Project Overview

**Project:** SupportPilot

**Description:** An event-driven AI-powered customer support ticket triage system.

SupportPilot is designed to automatically receive customer support tickets, process them asynchronously, classify them using AI, retrieve relevant knowledge-base information, and provide recommendations for human support agents.

### Main Technologies

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| TypeScript | Type-safe development |
| Express.js | Backend API framework |
| PostgreSQL | Relational database |
| Knex.js | SQL query builder and migrations |
| Redis | Queue and temporary data storage |
| BullMQ | Background job processing |
| Docker | Containerization |
| Next.js | Frontend |
| LLM API | AI ticket classification |

---

# 2. Initial Project Setup

## Step 1: Create the project directory

**Command:**

```bash
mkdir supportpilot
cd supportpilot
```

**Explanation:**

- `mkdir` creates a new directory.
- `supportpilot` is the project directory name.
- `cd` changes the current working directory.

**Purpose:** Create a dedicated workspace for the SupportPilot project.

## Step 2: Initialize Git

**Command:**

```bash
git init
```

**Explanation:**

Initializes a new Git repository in the current directory.

Git tracks changes in project files and allows us to maintain version history.

## Step 3: Initialize Node.js

**Command:**

```bash
npm init -y
```

**Explanation:**

- `npm` is the Node Package Manager.
- `init` initializes a Node.js project.
- `-y` automatically accepts the default configuration.

**Result:** Creates `package.json`, which contains project metadata, scripts and dependencies.

## Step 4: Install backend dependencies

**Command:**

```bash
npm install express dotenv cors helmet
```

**Purpose of each dependency:**

- `express`: Creates HTTP routes and handles API requests.
- `dotenv`: Loads environment variables from `.env`.
- `cors`: Configures Cross-Origin Resource Sharing.
- `helmet`: Adds security-related HTTP headers.

## Step 5: Install development dependencies

**Command:**

```bash
npm install -D typescript tsx @types/node @types/express @types/cors vitest
```

**Explanation:**

The `-D` flag installs packages as development dependencies.

- `typescript`: TypeScript compiler.
- `tsx`: Executes TypeScript files directly during development.
- `@types/node`: Node.js type definitions.
- `@types/express`: Express type definitions.
- `@types/cors`: CORS type definitions.
- `vitest`: Testing framework.

## Step 6: Initialize TypeScript

**Command:**

```bash
npx tsc --init
```

**Explanation:**

- `npx` executes a locally installed package.
- `tsc` is the TypeScript compiler.
- `--init` generates a `tsconfig.json` configuration file.

**Purpose:** Configure TypeScript compilation for the backend.

## Step 7: Create the backend folder structure

```text
supportpilot/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   └── types/
│
├── tests/
├── docs/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── docker-compose.yml
```

**Purpose of the folders:**

- `config`: Application and database configurations.
- `routes`: API endpoint definitions.
- `controllers`: Request and response handling.
- `services`: Business logic.
- `middleware`: Authentication, validation and error handling.
- `utils`: Reusable helper functions.
- `types`: Shared TypeScript types.
- `tests`: Automated tests.
- `docs`: Project documentation.

## Step 8: Configure GitHub remote

**Commands:**

```bash
git remote add origin https://github.com/anjalei/support-pilot.git
git remote -v
```

**Explanation:**

- `git remote add origin`: Connects the local repository to GitHub.
- `origin`: The conventional name for the remote repository.
- `git remote -v`: Displays configured remote URLs.

**Result:** Local repository connected to the SupportPilot GitHub repository.

## Step 9: Create the initial commit

```bash
git add .
git commit -m "chore: initialize SupportPilot project"
```

**Explanation:**

- `git add .`: Stages project files for committing.
- `git commit`: Saves a snapshot of staged changes.
- `-m`: Provides a descriptive commit message.

---

# 3. Backend Configuration

## Step 10: Configure package scripts

Updated the `scripts` section in `package.json`.

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest"
  }
}
```

**Explanation:**

- `npm run dev`: Starts the development server and watches for file changes.
- `npm run build`: Compiles TypeScript into JavaScript.
- `npm start`: Runs the compiled application.
- `npm test`: Runs Vitest.

## Step 11: Configure TypeScript

Updated `tsconfig.json`.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Purpose:**

- Enable strict TypeScript checking.
- Define the source directory.
- Define the compiled output directory.
- Configure module resolution.

## Step 12: Configure environment variables

Created `.env` in the project root.

```env
PORT=8000
NODE_ENV=development
```

**Purpose:** Store configuration separately from application code.

## Step 13: Configure Express application

Created `src/app.ts`.

Responsibilities:

- Initialize Express.
- Configure Helmet.
- Configure CORS.
- Enable JSON request parsing.
- Add a health-check endpoint.

## Step 14: Configure the server

Created `src/server.ts`.

Responsibilities:

- Load environment variables.
- Import the Express application.
- Start the HTTP server.
- Listen on port 8000.

## Step 15: Configure `.gitignore`

Added:

```gitignore
.env
.env.*
!.env.example

node_modules/
dist/
```

**Purpose:** Prevent environment secrets, dependencies and generated build files from being committed to Git.

### Remove an accidentally tracked environment file

**Command:**

```bash
git rm --cached .env
```

**Explanation:**

Removes `.env` from Git tracking while preserving the actual file on the local machine.

---

# 4. Docker Setup

## Step 16: Verify Docker installation

**Commands:**

```bash
docker --version
docker compose version
```

**Purpose:**

Verify that Docker CLI and Docker Compose are installed.

Docker Compose is used to define and manage multiple containers through a YAML configuration file.

## Step 17: Create Docker Compose configuration

Created `docker-compose.yml` manually in the project root.

The file defines two services:

1. PostgreSQL
2. Redis

### PostgreSQL configuration

- Image: `postgres:17-alpine`
- Container: `supportpilot-postgres`
- Database: `supportpilot`
- Username: `supportpilot`
- Internal port: `5432`
- Host port: `5433`

### Redis configuration

- Image: `redis:7-alpine`
- Container: `supportpilot-redis`
- Internal port: `6379`
- Host port: `6380`

### Port mapping

```yaml
ports:
  - "5433:5432"
```

The left side represents the Mac's port, and the right side represents the container's port.

PostgreSQL already runs locally on port 5432, so Docker PostgreSQL uses port 5433 on the Mac.

Redis uses port 6380 on the Mac because the existing local Redis service uses port 6379.

### Persistent volumes

```yaml
volumes:
  supportpilot_postgres_data:
  supportpilot_redis_data:
```

Volumes preserve database and Redis data even when containers are stopped or recreated.

### Health checks

PostgreSQL uses `pg_isready` to verify database availability.

Redis uses `redis-cli ping` to verify Redis availability.

## Step 18: Configure Docker environment variables

Updated `.env`:

```env
PORT=8000
NODE_ENV=development

POSTGRES_USER=supportpilot
POSTGRES_PASSWORD=<LOCAL_DEVELOPMENT_PASSWORD>
POSTGRES_DB=supportpilot

POSTGRES_HOST=localhost
POSTGRES_PORT=5433

DATABASE_URL=postgresql://supportpilot:<LOCAL_DEVELOPMENT_PASSWORD>@localhost:5433/supportpilot

REDIS_HOST=localhost
REDIS_PORT=6380
REDIS_URL=redis://localhost:6380
```

Actual credentials are maintained in the local `.env` file and are not included in Git documentation.

## Step 19: Start Docker Desktop

Opened Docker Desktop on macOS and waited for the Docker Engine to become operational.

An initial attempt to start containers failed because the Docker daemon was not running.

After starting Docker Desktop, container creation succeeded.

## Step 20: Create and start containers

**Command:**

```bash
docker compose up -d
```

**Explanation:**

- `docker compose`: Executes Docker Compose.
- `up`: Creates and starts the services defined in `docker-compose.yml`.
- `-d`: Runs containers in detached mode (background).

**Result:**

Docker downloaded the required images, created containers, configured port mappings and created persistent volumes.

Two containers were successfully started:

- `supportpilot-postgres`
- `supportpilot-redis`

## Step 21: Verify container status

**Command:**

```bash
docker compose ps
```

**Purpose:**

Displays the services defined in the Compose project, their container status and port mappings.

**Verified result:**

| Container | Image | Host port | Status |
|---|---|---|---|
| supportpilot-postgres | postgres:17-alpine | 5433 | Healthy |
| supportpilot-redis | redis:7-alpine | 6380 | Healthy |

Both containers reported healthy status.

---

# 5. PostgreSQL Database Verification

## Step 22: Connect to the Docker PostgreSQL container

**Command:**

```bash
docker exec -it supportpilot-postgres \
psql -U supportpilot -d supportpilot
```

**Explanation:**

- `docker exec`: Executes a command inside a running container.
- `-it`: Enables interactive terminal access.
- `supportpilot-postgres`: Container name.
- `psql`: PostgreSQL command-line client.
- `-U supportpilot`: Connects using the supportpilot database user.
- `-d supportpilot`: Connects to the supportpilot database.

## Step 23: Verify the database name

**SQL command:**

```sql
SELECT current_database();
```

**Verified output:**

```text
supportpilot
```

## Step 24: Verify the database user

**SQL command:**

```sql
SELECT current_user;
```

**Verified output:**

```text
supportpilot
```

Exit PostgreSQL:

```sql
\q
```

**Result:** Successfully connected to the newly created SupportPilot PostgreSQL database.

---

# 6. Redis Verification

## Step 25: Test Redis connectivity

**Command:**

```bash
docker exec -it supportpilot-redis redis-cli ping
```

**Explanation:**

- `docker exec`: Executes a command inside the Redis container.
- `redis-cli`: Opens the Redis command-line client.
- `ping`: Checks whether Redis is responding.

**Verified output:**

```text
PONG
```

**Result:** Redis is running and responding successfully.

---

# 7. Current Project Status

Completed:

- [x] Created SupportPilot project directory.
- [x] Initialized Node.js.
- [x] Initialized Git.
- [x] Installed Express and TypeScript dependencies.
- [x] Configured TypeScript.
- [x] Created backend folder structure.
- [x] Configured Express application.
- [x] Created HTTP server.
- [x] Added health-check endpoint.
- [x] Configured environment variables.
- [x] Configured `.gitignore`.
- [x] Connected local Git repository to GitHub.
- [x] Installed and verified Docker.
- [x] Created Docker Compose configuration.
- [x] Created PostgreSQL container.
- [x] Created Redis container.
- [x] Configured persistent volumes.
- [x] Verified PostgreSQL connectivity.
- [x] Verified Redis connectivity.

### Next Development Tasks

1. Connect PostgreSQL to Node.js using Knex.js.
2. Configure database connection pooling.
3. Create database migrations.
4. Design the initial SupportPilot database schema.
5. Implement webhook ingestion.

**Current milestone:** Initial project setup and local infrastructure completed.

**Note:** Database application-level integration, migrations, and application testing are still pending.