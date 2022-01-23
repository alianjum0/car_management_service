FROM node:14.18.3-alpine3.14 as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
USER node
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .
RUN npm run build

FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
# RUN npm install --save-dev sequelize-cli
RUN npm install --production
COPY --from=builder /home/node/app/bin ./bin

COPY --chown=node:node .env .
COPY --chown=node:node  /src/api ./src/api

EXPOSE 3000
CMD [ "node", "./bin/index.js" ]
