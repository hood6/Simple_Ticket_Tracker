ARG POSTGRES_VERSION=18.3
FROM postgres:${POSTGRES_VERSION} AS base

WORKDIR /usr/local/app
COPY --chmod=+x SQL ./SQL
EXPOSE 3001

WORKDIR /usr/local/app/SQL
ENTRYPOINT ["start-db.sh"]
# ENTRYPOINT sleep 10m