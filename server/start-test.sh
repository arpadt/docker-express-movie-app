#!/usr/bin/env bash

docker container run --rm -p 27017:27017 --name mongo-test-container -v mongo-data:/data/db -d mongo
echo "Docker mongo container started."

sleep 3

export MONGO_URI="mongodb://192.168.99.100:27017/db-test"
echo "Mongo URI has been set."

npm test
