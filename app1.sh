#!/bin/bash
docker build -t app1 .
docker tag app1 demo.goharbor.io/seminario1/app1
docker push demo.goharbor.io/seminario1/app1