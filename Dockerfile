# ── Single-container deploy: build the SPA, then serve it from the API ──
# Coolify: one Application, Base Directory "/", this Dockerfile, port 8080.

# Stage 1 — build the Vite frontend
FROM node:20-alpine AS web
WORKDIR /web
# Same-origin: the app calls /api on its own host, so no separate API domain.
ENV VITE_API_BASE=/api
ARG VITE_SUPABASE_URL=""
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY=""
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build           # → /web/dist

# Stage 2 — the API server, serving ./public (the built SPA)
# Debian (glibc) rather than Alpine: mediasoup ships a prebuilt worker binary
# for linux-x64 glibc, so `npm ci` fetches it instead of compiling. On Alpine
# (musl) the fetch fails and the worker would need python3/make/g++ to build.
# The dependency is optional, so the app still boots without voice if the
# download is unavailable at build time.
FROM node:20-bookworm-slim
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev
COPY server/ .
COPY --from=web /web/dist ./public
ENV PORT=8080
EXPOSE 8080
CMD ["node", "src/index.js"]
