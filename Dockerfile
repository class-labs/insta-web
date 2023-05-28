FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

ARG VITE_API_HOST=""
ENV VITE_API_HOST=${VITE_API_HOST}
RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
