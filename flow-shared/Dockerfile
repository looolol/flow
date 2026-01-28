FROM node:22-alpine

WORKDIR /usr/src/flow-shared

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "echo 'flow-shared built!'"]