FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY lib ./lib
ENTRYPOINT ["node", "src/index.mjs"]
