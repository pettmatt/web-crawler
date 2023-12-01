FROM node:20-alpine
WORKDIR /usr/src/validator

COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "start"]
