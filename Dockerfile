FROM node:22 AS development
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node --from=development /app/dist ./dist
EXPOSE 3000
CMD npm run migration:run && npm run start:prod
