#!/bin/sh

echo "Building new container..."
docker build . -t nextjs-docker
echo "Stopping container..."
docker stop `docker ps | grep nextjs-docker | awk '{print $1}'`
echo "Starting new container..."
docker run -p 3000:3000 -d --restart unless-stopped nextjs-docker
