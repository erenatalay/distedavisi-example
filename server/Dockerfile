FROM node:lts-alpine

RUN npm install -g nodemon

WORKDIR /app/data

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]