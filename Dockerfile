FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
EXPOSE 80
RUN mkdir /app
# COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /app
COPY ./mime.types /etc/nginx/mime.types