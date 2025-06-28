#!/bin/bash

# This script is used to start the Docker containers for the application.
docker compose up --force-recreate -V -d --build

