FROM node:15.4-alpine3.10

ENV \
  PORT=3000 \
  ID_HOST= \
  CLIENT_ID= \
  CLIENT_SECRET=

WORKDIR /opt/app

ADD package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
