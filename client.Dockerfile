FROM nginx:alpine

LABEL description "Angular client side"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/ .
