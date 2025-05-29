# Этап сборки
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
COPY .eslintrc.json ./
COPY tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm prune --production

# Этап выполнения
FROM node:18
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
