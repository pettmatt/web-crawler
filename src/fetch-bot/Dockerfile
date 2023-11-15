FROM node:20-alpine
WORKDIR /usr/src/fetch-bot

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run start
