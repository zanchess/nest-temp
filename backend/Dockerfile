FROM node:18.18.0 As development

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend .

CMD ["npm run build main"]