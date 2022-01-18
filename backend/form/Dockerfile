FROM node:14.18-alpine3.14

WORKDIR /app/form

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]
