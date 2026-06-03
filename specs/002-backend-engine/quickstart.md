# Quickstart Guide: Backend Dialogue Engine

## Backend Installation & Setup

We recommend creating a `backend-amordoce` directory next to the frontend for the NestJS server. 

1. Install NestJS CLI globally or bootstrap locally:
   ```bash
   npx -y @nestjs/cli new backend-amordoce --package-manager npm
   ```
2. Navigate to NestJS backend folder and install TypeORM, PostgreSQL drivers, and Redis clients:
   ```bash
   npm install --save @nestjs/typeorm typeorm pg cache-manager cache-manager-redis-yet redis
   ```
3. Boot the environment variables (e.g. Postgres DB URI, Redis URL) in `.env`.
4. Start NestJS dev server:
   ```bash
   npm run start:dev
   ```

## Local Mock Redis Config
Ensure Redis is running on port 6379, or configure the memory cache fallback inside `app.module.ts`.
