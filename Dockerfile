FROM node:10-alpine

LABEL description "Movie app build Typescript, MEAN and Docker."

ARG mongodb_container
ARG app_env

ENV NODE_ENV=$app_env
ENV MONGO_URI="mongodb://${mongodb_container}:27017/db-${app_env}"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN mkdir server
COPY ./server/package.json .
RUN npm install -E

COPY ./server/lib/. ./server

RUN mkdir dist
COPY ./dist ./dist

CMD ["npm", "start"]
