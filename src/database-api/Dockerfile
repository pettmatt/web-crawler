FROM node:20-alpine
WORKDIR /usr/src/api

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000
RUN "npm run start"
