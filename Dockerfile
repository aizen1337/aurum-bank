from node:19

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]