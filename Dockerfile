
FROM node:20.18.0-alpine3.19 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --omit=optional \
    && npm cache clean --force \
    && rm -rf /root/.npm /tmp/* /var/cache/apk/*

COPY prisma tsconfig*.json doc ./
COPY . .

RUN npm run build


FROM node:20.18.0-alpine3.19 AS production
WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/node_modules /app/prisma /app/dist /app/tsconfig*.json /app/doc ./

RUN rm -rf /prisma/migrations /root/.npm /tmp/* /var/cache/apk/* 

ENTRYPOINT ["sh", "-c", "npm run prisma:start"]
