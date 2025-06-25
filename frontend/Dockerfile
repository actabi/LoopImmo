FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Ajout de l'option --single pour gérer React Router
CMD ["sh", "-c", "npx serve -s dist -p ${PORT:-3001} --single"]