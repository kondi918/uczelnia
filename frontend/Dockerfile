# Stage 1: Build Angular
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./

RUN npm run build -- --project frontend --configuration production
# Stage 2: Serwowanie przez Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
