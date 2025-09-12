#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go to project root
cd "$SCRIPT_DIR/../.."

# Exit immediately if a command exits with a non-zero status.
set -e

# --- SSL Certificate Generation ---
echo "🔐 Generating SSL certificates..."
./.dev/scripts/ssl-generate.sh --domain application.int --dir nginx
./.dev/scripts/ssl-generate.sh --domain auth.application.int --dir keycloak
./.dev/scripts/ssl-generate.sh --domain api.application.int --dir nestjs
./.dev/scripts/ssl-generate.sh --domain web.application.int --dir web
./.dev/scripts/ssl-generate.sh --domain docs.application.int --dir docs
echo "✅ SSL certificates generated successfully."

# --- Environment File Setup ---
echo "📄 Creating .env files from examples..."
if [ ! -f .env ]; then
  echo "'.env' file not found. Copying '.env.example' to '.env'."
  cp .env.example .env
else
  echo "'.env' file already exists, skipping copy."
fi
if [ ! -f apps/api/.env ]; then
  echo "'apps/api/.env' file not found. Copying 'apps/api/.env.example' to 'apps/api/.env'."
  cp apps/api/.env.example apps/api/.env
else
  echo "'apps/api/.env' file already exists, skipping copy."
fi
echo "✅ .env files created successfully."

# --- NGINX Config ---
echo "🌐 Preparing NGINX config..."
NGINX_CONF_PATH="./.dev/nginx"
if [ ! -f "$NGINX_CONF_PATH/nginx.conf" ]; then
    cp "$NGINX_CONF_PATH/nginx.example.conf" "$NGINX_CONF_PATH/nginx.conf"
    echo "✅ nginx.conf created from example"
else
    echo "ℹ️ nginx.conf already exists, skipping copy"
fi

# --- Install Dependencies ---
echo "📦 Installing dependencies..."
yarn install
echo "✅ Dependencies installed successfully."

# --- Docker Compose ---
echo "🐳 Starting Docker containers..."
./.dev/scripts/start-docker.sh
echo "✅ Docker containers started successfully."

echo "🚀 Initial setup complete. Your development environment is ready."
