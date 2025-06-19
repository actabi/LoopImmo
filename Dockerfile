# Use Node 20 for building
FROM node:20 AS builder
WORKDIR /app

# Install root deps
COPY package.json package-lock.json ./
RUN npm install

# Install server deps
COPY server/package.json server/package-lock.json ./server/
RUN npm install --prefix server

# Copy source
COPY . .

# Build React frontend
RUN npm run build

# Build backend
RUN npm run build --prefix server

# Runtime image
FROM node:20-slim
WORKDIR /app

# Copy server files and node modules
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/package.json ./server/package.json

EXPOSE 3000
CMD ["node", "server/dist/index.js"]
