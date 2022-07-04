FROM node:14.14.0-alpine3.12

WORKDIR /todolist

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]