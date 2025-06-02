FROM node:24.1.0-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force


COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY doc ./doc/
COPY . .


RUN npm run build


FROM node:24.1.0-alpine AS production
WORKDIR /app


ENV NODE_ENV=production


COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc


ENTRYPOINT ["sh", "-c", "npm run prisma:start"]
