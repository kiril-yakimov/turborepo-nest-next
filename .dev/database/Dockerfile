FROM postgres:17.4-alpine

# Define build arguments
ARG KEYCLOAK_DB
ARG KEYCLOAK_USER
ARG KEYCLOAK_PASSWORD
ARG API_DB
ARG API_USER
ARG API_PASSWORD

# Install envsubst (it's part of gettext package)
RUN apk add --no-cache gettext

# Copy the template SQL file
COPY ./.dev/database/init.template.sql /docker-entrypoint-initdb.d/init.template.sql

# Process the template and set up the init SQL
RUN KEYCLOAK_DB=$KEYCLOAK_DB \
    KEYCLOAK_USER=$KEYCLOAK_USER \
    KEYCLOAK_PASSWORD=$KEYCLOAK_PASSWORD \
    API_DB=$API_DB \
    API_USER=$API_USER \
    API_PASSWORD=$API_PASSWORD \
    envsubst < /docker-entrypoint-initdb.d/init.template.sql > /docker-entrypoint-initdb.d/init.sql

RUN rm /docker-entrypoint-initdb.d/init.template.sql && \
    apk del gettext
