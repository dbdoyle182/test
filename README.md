# Bot-O-Mat (The Game)

Welcome to my interpretation of Bot-O-Mat! I found this a fun opportunity to flex my full stack skills by building a React UI on top of a Node/Express backend. I've spent plenty of time playing tap centric mobile games (hopefully I'm not alone in that!) and thought it would be fun to take a crack at replicating that idea with this assignment. I've built this application using a DERN stack (MERN with the usage of DyanamoDB as my NoSQL versus MongoDB).

## Pre-Requisites 

- Clone this repository to your machine
- Node installed [Install Now!](https://nodejs.org/en/download/)
- Yarn installed:
    - Mac users: `brew install yarn`
    - Windows users: [Click Here!](https://yarnpkg.com/latest.msi)
    - Note: _Yarn is not required but recommended, the scripts written within the package.json utilize Yarn_
- Java past version 6.X 
    - Download Standard Edition (currently 12.0.1) [here](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
    - Check to make sure Java is in your environmental variables by running `java -version`
- Install wget if you would like to use the pre-built scripts to set up the database and run the database
- Dynamo DB .tar.gz 
    - Download the file [here](https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz) and be sure to unpack one directory above this one
        OR
    - If you are a Mac user navigate to the repository in an instance of bash and run `yarn install:db` (This will grab the tar.gz and unpack it one directory above this repository and start up the local Dynamo DB instace)

## Getting Started

_If you don't feel like spinning up a local version of this application you can go [here](https://rocky-shore-28642.herokuapp.com/) to see a version live on Heroku, it is built with a Dynamo DB database and allows for user authentication and database creation using Cognito and triggers within Cognito_

- Navigate to the repository in an instance of bash/command line (new instance if you utilized `yarn install:db`) and run `yarn installDeps`
    - _This will install dependencies for both the nodejs backend and the React frontend_
- Create a `.env` file if you would like to develop this for production in the root of this repository and include the following: 
    ```
        AWS_ID=<YOURKEY>
        AWS_KEY=<YOURKEY>
    ```
    _Local instances of DynamoDB do not require valid AWS credentials, just the presense of them, there are dummy keys in place for local setup_
- From there, if you do not have Dynamo DB running yet, run the `yarn start:db` command to start it up
    - NOTE: If you downloaded and unpacked the tar.gz file in a directory other than the one above this repository this script _will not work_ if that is the case you can still spin up Dynamo DB locally just navigate to the directory in which you unpacked the tar.gz file and run `java -Djava.library.path=./DynamoDBLocal_lib/ -jar DynamoDBLocal.jar"`
- Once Dynamo DB is running (leave it running), go ahead and run `yarn create:db` and when that is successful run `yarn load:data` (_These will create the tables for the local version of the application and load them with some dummy data_)
- Finally, run `yarn start` and the server will start up with the React app following closely behind, the browser should pop when ready but if it doesn't open your browser to [localhost:3000](http://localhost:3000)
    - Note: Clear port 3000 if you are already running something there.