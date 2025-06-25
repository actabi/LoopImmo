FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Build avec npx au lieu du script npm
RUN npx tsc

# Exposer le port
EXPOSE 3000

# Démarrer le serveur
CMD ["npm", "start"]