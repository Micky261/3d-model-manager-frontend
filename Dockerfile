FROM nginx:1.27.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/threed-model-manager-frontend/browser /usr/share/nginx/html
