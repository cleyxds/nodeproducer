FROM node:lts-alpine
RUN apk add dumb-init

ENV NODE_ENV production

WORKDIR /home/application

COPY --chown=node:node . .

RUN yarn install --frozen-lockfile

USER node

EXPOSE 3333

CMD ["dumb-init", "node", "src/server.js"]
