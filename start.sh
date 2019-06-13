#!/bin/bash

## change into directory one level above where this script is located
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )/.."

mkdir dynamodb
cd ./dynamodb
wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz
tar -xvzf dynamodb_local_latest.tar.gz
java -Djava.library.path=./DynamoDBLocal_lib/ -jar DynamoDBLocal.jar