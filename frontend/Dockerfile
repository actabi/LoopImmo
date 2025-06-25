FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Définir les variables d'environnement au moment du build
ENV VITE_LAUNCH_MODE=false
ENV VITE_V2_MODE=true

# Installer les dépendances de production
RUN npm run build

# Ajout de l'option --single pour gérer React Router
CMD ["sh", "-c", "npx serve -s dist -p ${PORT:-3001} --single"]