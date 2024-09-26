FROM node:20.17.0-alpine3.20
WORKDIR /usr/local/app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev"]
