ARG NODE_VERSION=24.14.1
FROM node:${NODE_VERSION} AS base

# Should not use relative path
WORKDIR ../../../src/
COPY back-end ./back-end
EXPOSE 8000

RUN useradd test
USER test

RUN node server.js