#!/bin/bash

set -e

echo "🔐 Generating SSL certificates..."

# SSL certs for nestjs and keycloak
./.dev/scripts/ssl-generate.sh --domain int --dir nestjs
./.dev/scripts/ssl-generate.sh --domain keycloak.local --dir keycloak

echo "🌐 Preparing NGINX config..."
NGINX_CONF_PATH="./.dev/nginx"
if [ ! -f "$NGINX_CONF_PATH/nginx.conf" ]; then
    cp "$NGINX_CONF_PATH/nginx.example.conf" "$NGINX_CONF_PATH/nginx.conf"
    echo "✅ nginx.conf created from example"
else
    echo "ℹ️ nginx.conf already exists, skipping copy"
fi

# echo "🐳 Starting Docker..."
#
# docker compose up --force-recreate -d --build

echo "🚀 Dev environment is ready"
