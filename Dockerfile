FROM node:20-alpine
LABEL maintainer="Sublinks Core Developers <hello@sublinks.org>"
LABEL description="Frontend UI service for Sublinks"

WORKDIR /app
COPY . /app

RUN npm install && npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
