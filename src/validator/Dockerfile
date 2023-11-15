FROM node:20-alpine
WORKDIR /usr/src/validator

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run start
