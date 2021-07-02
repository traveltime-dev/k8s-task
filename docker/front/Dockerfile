FROM node:14.16.1-alpine

RUN mkdir -p /app
WORKDIR /app

RUN mkdir frontend
RUN mkdir backend

WORKDIR /app/frontend

COPY frontend/ ./

RUN npm ci --silent

RUN npm run build

RUN mv ./build /app

WORKDIR /app/backend
COPY prodPageServer/ ./

RUN npm ci --silent

CMD ["npm", "start"]