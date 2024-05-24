#!/bin/bash

mkdir -p ./build

# Build
go generate
CGO_ENABLED=0 GOOS=linux go build -o ./build/mc-be-ws-api
CGO_ENABLED=0 GOOS=windows go build -o ./build/mc-be-ws-api.exe

cd ./build

# Zip
zip -r ./mc-be-ws-api.zip ./*
