FROM node:16.16.0-alpine

WORKDIR /app

COPY package.json package-lock.json  ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD node backend/server.js