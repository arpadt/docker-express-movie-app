FROM nginx:alpine

LABEL description "Angular client side"

WORKDIR /usr/share/nginx/html
COPY dist/ .
