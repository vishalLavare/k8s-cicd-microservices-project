#!/bin/bash
# Helper script to build Docker images locally
echo "Building Frontend..."
docker build -t frontend:latest ./frontend

echo "Building Backend..."
docker build -t backend:latest ./backend
