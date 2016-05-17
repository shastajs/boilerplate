FROM node:latest

# set up the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --production
COPY bin /usr/src/app/bin
COPY server /usr/src/app/server
COPY dist /usr/src/app/dist
COPY config /usr/src/app/config
