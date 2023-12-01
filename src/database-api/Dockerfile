FROM node:20-alpine
WORKDIR /usr/src/api

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
