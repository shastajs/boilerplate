FROM node:latest

# set up the work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app

# run the shit
EXPOSE 80
CMD [ "npm", "run", "start:prod" ]
