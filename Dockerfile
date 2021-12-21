FROM node:15.4-alpine3.10

WORKDIR /opt/app

ADD package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
