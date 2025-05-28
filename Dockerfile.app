# Base image
FROM node:22.11.0-alpine3.20 AS base
WORKDIR /app
RUN apk add --no-cache bash

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Build code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production

# Run application securely
USER node
CMD ["npm", "run", "prisma:prisma-db"]
