FROM node:latest

WORKDIR /home/node/application

ADD "./package.json" "/home/node/application/package.json"

RUN ["npm", "install"]

CMD ["npm", "start"]