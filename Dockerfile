# ── Single-container deploy: build the SPA, then serve it from the API ──
# Coolify: one Application, Base Directory "/", this Dockerfile, port 8080.

# Stage 1 — build the Vite frontend
FROM node:20-alpine AS web
WORKDIR /web
# Same-origin: the app calls /api on its own host, so no separate API domain.
ENV VITE_API_BASE=/api
ARG VITE_API_TOKEN=""
ENV VITE_API_TOKEN=$VITE_API_TOKEN
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build           # → /web/dist

# Stage 2 — the API server, serving ./public (the built SPA)
FROM node:20-alpine
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev
COPY server/ .
COPY --from=web /web/dist ./public
ENV PORT=8080
EXPOSE 8080
CMD ["node", "src/index.js"]
