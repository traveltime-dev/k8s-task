FROM node:14.16.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY ./backend .

RUN npm ci --silent

CMD npm start