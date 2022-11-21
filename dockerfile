FROM node:16-alpine

RUN mkdir /app

WORKDIR /app

COPY ./package.json /app

RUN npm install -g npm@9.1.2

RUN npm install

COPY . /app

RUN npm run build
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]