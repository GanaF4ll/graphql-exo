FROM node:22.13.1-slim

WORKDIR /app

RUN npm i -g pnpm && npm uninstall -g npm

RUN apt-get update -y && apt-get install -y openssl procps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . ./

EXPOSE 3001

CMD ["pnpm", "run", "start:dev"]
