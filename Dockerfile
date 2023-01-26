# Development
FROM node AS development
WORKDIR /logbook/src/app
# install and app dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build
# expose port

# Production
FROM node AS production
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