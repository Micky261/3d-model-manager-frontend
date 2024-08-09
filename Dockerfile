FROM nginx:1.25.5-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/threed-model-manager-frontend /usr/share/nginx/html
