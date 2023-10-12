FROM node:18.18.0-slim as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY --chown=node:node . .
RUN yarn build
RUN yarn --production

# --- production ---

FROM node:18.18.0-slim

ENV NODE_ENV production

USER node
WORKDIR /

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/yarn.lock ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
