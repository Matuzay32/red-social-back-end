#  FROM node:18.1-alpine as builder
FROM node:16.3
RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","start:dev"]



