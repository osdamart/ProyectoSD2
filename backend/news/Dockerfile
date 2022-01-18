FROM node:14.18-alpine3.14

WORKDIR /app/news

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "start"]
