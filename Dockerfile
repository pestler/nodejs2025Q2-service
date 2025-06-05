FROM node:20.18.0-alpine3.19 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --omit=optional --legacy-peer-deps && npm cache clean --force

COPY prisma ./prisma/
COPY tsconfig.json ./tsconfig.json
COPY src ./src
COPY doc ./doc/

RUN npm run build


FROM node:20.18.0-alpine3.19 AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/doc ./doc/

ENTRYPOINT ["sh", "-c", "npm run prisma:start"]
