FROM node:12

COPY package*.json ./
RUN npm install

COPY . /app
WORKDIR /app

#ENTRYPOINT [ "node", "." ]