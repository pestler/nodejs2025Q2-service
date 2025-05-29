FROM node:24.1.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --production=false && npm cache clean --force

COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY doc ./doc/
COPY . .

RUN npm run build

FROM node:24.1.0-alpine AS production
WORKDIR /app

COPY --from=builder /app ./

ENTRYPOINT ["sh", "-c", "npm run prisma:start && exec npm run start"]
