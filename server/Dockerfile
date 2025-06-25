FROM node:18-alpine

# Installer TypeScript globalement
RUN npm install -g typescript

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Maintenant tsc est disponible globalement
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
