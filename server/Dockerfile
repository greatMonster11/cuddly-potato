FROM node:20-alpine As build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

FROM node:20-alpine As production
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
