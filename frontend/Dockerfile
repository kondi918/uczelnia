FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli

COPY . .
RUN npm install
RUN ng build --configuration production

FROM nginx:latest
# Czyścimy domyślną zawartość nginx
RUN rm -rf /usr/share/nginx/html/*

# Kopiujemy nasz nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Kopiujemy zbudowany frontend
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/

# Kopiujemy entrypoint do generowania env.js
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Ustawiamy entrypoint i domyślny CMD dla Nginx
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80