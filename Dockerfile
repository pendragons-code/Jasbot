
FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add git ca-certificates

COPY ["package.json", "./"]
RUN npm install

COPY . .
CMD ["npm", "run", "deploy"]
