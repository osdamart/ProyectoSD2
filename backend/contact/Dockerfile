FROM node:14.18-alpine3.14

WORKDIR /app/contact

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
