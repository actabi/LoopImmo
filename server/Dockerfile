FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Corriger les permissions des binaires node_modules
RUN chmod +x node_modules/.bin/*

# Copier le code source
COPY . .

# Build l'application TypeScript
RUN npm run build

# Exposer le port
EXPOSE 3000

# Démarrer le serveur
CMD ["npm", "start"]