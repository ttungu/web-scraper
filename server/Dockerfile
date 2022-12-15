FROM node:18-alpine

# install headless browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss
# install app

WORKDIR /usr/src/api/
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "run", "start"]


