FROM node:18-alpine

WORKDIR /usr/src/client/
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV=production
RUN npm install -g serve
# CMD ["npm", "run", "start"]
CMD [ "npx", "serve", "build" ]

