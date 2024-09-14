FROM node:18.20-alpine as build-stage

WORKDIR /app

RUN npm install pnpm -g

COPY /apps/api/package.json .

RUN ln -s /sbin/runc /usr/bin/runc

COPY /apps/api .

RUN pnpm install

RUN pnpm run build

# production stage
FROM node:18.20-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/prisma /app
COPY --from=build-stage /app/.env /app

WORKDIR /app

RUN npm install pnpm -g

RUN npm install @brakebein/prisma-generator-nestjs-dto -g

RUN pnpm install --production

RUN pnpx prisma generate

EXPOSE 8344

CMD ["node", "/app/src/main.js"]

