FROM node:10-alpine

LABEL description "Movie app build Typescript, MEAN and Docker."

ARG mongodb_name
ARG app_env
ARG port

ENV NODE_ENV=$app_env
ENV PORT=$port
ENV DB_NAME=$mongodb_name
ENV MONGO_URI="mongodb://${mongodb_name}:27017/db-${app_env}"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY ./lib/. .

RUN npm install -E

EXPOSE $port

CMD ["npm", "start"]
