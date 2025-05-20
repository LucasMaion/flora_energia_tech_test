# Build is exclusively for development and demonstration purposes
# This Docker MUST be run in a development environment
FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .
# remove .env
RUN rm -f .env

CMD ["yarn", "run", "dev"]