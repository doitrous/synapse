# ---- Build stage: compile the Vite/React app to static files ----
FROM node:24-alpine AS build
WORKDIR /app

# Install deps from the lockfile first for better layer caching.
COPY package.json package-lock.json ./
RUN npm ci

# Build the production bundle into /app/dist.
COPY . .
RUN npm run build

# ---- Serve stage: nginx serving the static build ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
