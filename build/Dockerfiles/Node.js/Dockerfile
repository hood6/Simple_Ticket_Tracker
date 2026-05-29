# Currently only focus on a local env with a local container.
# Will need to consider different envs at some point.

ARG NODE_VERSION=24.14.1
FROM node:${NODE_VERSION} AS base

WORKDIR /usr/local/app
COPY back-end ./back-end
EXPOSE 3000

# RUN useradd test
# USER test

# This should work on container run.
# Warning about using JSON args for these two lines.
# Should change this to a shell script for better output.
WORKDIR /usr/local/app/back-end
ENTRYPOINT node server.js
# ENTRYPOINT /usr/local/app/back-end
# ENTRYPOINT sleep 10m
# CMD node server.js

# Come back and tack proper notes on this.