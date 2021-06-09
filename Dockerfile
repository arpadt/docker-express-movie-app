FROM node:14-alpine

LABEL description "Movie app build Typescript, MEAN and Docker."

ARG mongodb_container
ARG app_env

ENV NODE_ENV=$app_env
ENV MONGO_URI="mongodb://${mongodb_container}:27017/db-${app_env}"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN mkdir server
COPY ./server/package.json .
RUN npm install --production

COPY ./server/lib/. ./server

CMD ["npm", "start"]
