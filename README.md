## Start server

step 1: install mongoDB in your machine

see docs in [here](./docs/MongoDB.md)

Step 2: start your mongoDB

    brew services start mongodb-community

Step 3: start node server

    npm run start


1 node demo-api/todoServer

2 npm run start // "scripts": {
    "start": "nodemon demo-api/todoServer.js"
  }

3 ./node_modules/.bin/nodemon demo-api/todoServer
