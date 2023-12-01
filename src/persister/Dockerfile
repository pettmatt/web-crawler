FROM node:20

Run apt-get update && \
    apt-get install -y python3

WORKDIR /usr/src/persister

COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "start"]
