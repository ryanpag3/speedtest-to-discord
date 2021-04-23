FROM node:latest

ENV WORKDIR /opt/speedtest-to-discord

COPY . ${WORKDIR}

WORKDIR ${WORKDIR}

RUN yarn install

ENTRYPOINT ["yarn", "watch"]