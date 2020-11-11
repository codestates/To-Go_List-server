FROM node:lts

RUN mkdir -p /app

WORKDIR /app

ADD ./ /app

RUN npm install

CMD ["npm", "start"]

EXPOSE 3001