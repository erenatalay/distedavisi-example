FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci -qy

COPY . .
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]