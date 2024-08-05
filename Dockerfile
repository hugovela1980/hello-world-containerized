FROM node:18-bookworm-slim
WORKDIR /usr/local/app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev"]
