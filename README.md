angular-meetup
==============
Here are the instructions to run the code from the meetup.

### Get the code
git clone https://github.com/andresdominguez/angular-meetup.git

### Start Mongo DB
Download Mongo DB from http://www.mongodb.org/ 

Create a directory to hold the data and start mongod:

~/dev/angular-meetup$ mkdir db

~/Downloads/mongodb-linux-x86_64-2.4.3/bin$ ./mongod --dbpath ~/dev/angular-meetup/db/

### Get Node
Download and install http://nodejs.org/

### Install dependencies
~/dev/angular-meetup$ npm install

~/dev/angular-meetup$ ./node_modules/bower/bin/bower install 


### Run the server
~/dev/angular-meetup$ node server.js

### See the app
Open your browser http://localhost:3000/

### Test

Get Karma (you may need to use sudo)

npm install -g karma

And then start Karma

~/dev/angular-meetup$ karma start
