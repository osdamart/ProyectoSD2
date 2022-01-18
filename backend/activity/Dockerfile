FROM node:14.18-alpine3.14

WORKDIR /app/activity

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
