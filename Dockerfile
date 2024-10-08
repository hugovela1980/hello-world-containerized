FROM node:20.17.0-alpine3.20
WORKDIR /usr/local/app
COPY . .
RUN npm install
EXPOSE $PORT
CMD ["npm", "run", "dev"]
