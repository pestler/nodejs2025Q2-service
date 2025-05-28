
FROM node:node:22.16.0-slim AS base

WORKDIR /app


FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --only=production


FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production


USER node
CMD ["npm", "run", "prisma:prisma-db"]
