FROM node:lts-alpine

WORKDIR /app/opt
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "start"]
