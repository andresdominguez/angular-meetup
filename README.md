Custom DSL for Angular's $httpBackend and Jasmine matchers
===========================================================
This is a sample application that demonstrates how to write a DSL (domain specific language) to improve your
unit tets for an AngularJS application. The test code includes a DSL (called controller test helper) and a few
custon Jasmine matchers.

The sample application is called the band app. It has a mongo DB persistence layer, an express REST API, and an Angular application. The code was used to as an example in an Angular meetup.

Here are the instructions to run the code from the meetup.

Slides: https://docs.google.com/presentation/d/1FSe8eWcEhsycAZ4PqwvTPQ1wPk-aF1iGvnyo2fe81ic/edit?usp=sharing

### Get the code
`git clone https://github.com/andresdominguez/angular-meetup.git`

### Start Mongo DB
Download Mongo DB from http://www.mongodb.org/ 

Create a directory to hold the data and start mongod:

```bash
~/dev/angular-meetup$ mkdir db
~/Downloads/mongodb-linux-x86_64-2.4.3/bin$ ./mongod --dbpath ~/dev/angular-meetup/db/
```

### Get Node
Download and install http://nodejs.org/

### Install dependencies

```bash
~/dev/angular-meetup$ npm install
~/dev/angular-meetup$ ./node_modules/bower/bin/bower install
```

### Run the server
```bash
~/dev/angular-meetup$ node server.js
```

### See the app
Open your browser http://localhost:3000/

### Test

Get Karma (you may need to use sudo)

```bash
npm install -g karma
```

And then start Karma

```bash
gular-meetup$ karma start
```
