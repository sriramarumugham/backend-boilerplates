# Stage 1: Build Stage
FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies for building the application
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application using tsc
RUN npm run build:tsc

# Stage 2: Production Stage
FROM node:20-slim AS production

WORKDIR /app

# Copy the dist folder and package.json from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 4000

CMD ["node", "dist/server.js"]
