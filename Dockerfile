FROM node

WORKDIR /usr/src/nlcntt

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "serve"]