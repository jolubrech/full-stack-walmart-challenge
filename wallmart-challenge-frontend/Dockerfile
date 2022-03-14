
#stage 1
FROM node:14.18.0-alpine as node
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build -- --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/wallmart-challenge-shopping-cart /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
