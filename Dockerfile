FROM node:lts-alpine as ui-builder

WORKDIR /client

COPY ./client/package*.json /client/

RUN npm install

COPY ./client /client/

RUN npm run build

FROM node:lts-alpine

WORKDIR /server

COPY ./server/package*.json /server/

RUN npm install

COPY ./server /server/

COPY --from=ui-builder /client/build /server/src/public

EXPOSE 4200

CMD ["npm", "start"]
