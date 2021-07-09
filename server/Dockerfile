FROM node:latest

RUN ln -fs /usr/share/zoneinfo/US/Pacific-New /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /home/node/server

ADD "./package.json" "/home/node/server/package.json"

RUN ["npm", "install", "nodemon", "-g"]

RUN ["npm", "install", "opencollective-postinstall", "--save"]

RUN ["npm", "install", "--no-bin-links", "--no-optional"]

CMD ["npm", "start"]
