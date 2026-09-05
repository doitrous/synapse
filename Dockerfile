# ── Single-container deploy: build the SPA, then serve it from the API ──
# Coolify: one Application, Base Directory "/", this Dockerfile, port 8080.

# Stage 1 — build the Vite frontend
FROM node:22-alpine AS web
WORKDIR /web
# Same-origin: the app calls /api on its own host, so no separate API domain.
ENV VITE_API_BASE=/api
ARG VITE_TURNSTILE_SITE_KEY=""
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY
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
# Node 22: mediasoup (and mediasoup-client, supabase-js) declare `node >= 22`,
# and npm silently drops an *optional* dependency that fails its engine check —
# which is exactly how the image shipped without a voice server on Node 20.
FROM node:22-bookworm-slim
WORKDIR /app
# mediasoup's install step downloads a prebuilt worker; when that download is
# unavailable it compiles the worker instead, which needs a C++ toolchain and
# Python (meson/ninja are fetched by pip). Installed before `npm ci` so either
# path succeeds. `ca-certificates` is what the download itself needs.
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates python3 python3-pip make g++ pkg-config \
 && rm -rf /var/lib/apt/lists/*
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev
# Fail the build here, with the reason in the build log, rather than ship an
# image whose rooms say "voice is unavailable" at runtime.
RUN node -e "import('mediasoup').then((m) => console.log('mediasoup', m.version, 'ready'))"
COPY server/ .
COPY --from=web /web/dist ./public
ENV PORT=8080
# Production mode: Secure session cookies, no dev key fallback, express caching.
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "src/index.js"]
