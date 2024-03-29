# Development
FROM node:18-slim AS development
WORKDIR /logbook/src/app
# install and app dependencies
COPY . .
RUN npm install
RUN npm run build
# expose port
EXPOSE 3000

# Production
FROM node:18-slim AS production
# set environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /logbook/src/app
# add app
COPY --from=development /logbook/src/app/ .
# expose port
EXPOSE 3000
# start app
CMD ["node", "dist/main"]