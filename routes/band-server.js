var mongo = require('mongodb');
var _ = require("underscore");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    BANDS = 'bands',
    MEMBERS = 'members',
    ALBUMS = 'albums'

var menuApp = {};

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('banddb', server);

db.open(function(err, db) {
  if (!err) {
    console.log("Connected to 'banddb' database");
    db.collection('wines', {strict: true}, function(err, collection) {
      if (err) {
        console.log("The collection does not exist, creating a new one");
        populateDB();
      }
    });
  }
});

menuApp.findAll = function(collectionName, req, res) {
  db.collection(collectionName, function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};


exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving wine: ' + id);
  db.collection('wines', function(err, collection) {
    collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
      res.send(item);
    });
  });
};

exports.findAll = _.partial(menuApp.findAll, BANDS);

exports.addWine = function(req, res) {
  var wine = req.body;
  console.log('Adding wine: ' + JSON.stringify(wine));
  db.collection(BANDS, function(err, collection) {
    collection.insert(wine, {safe: true}, function(err, result) {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.updateWine = function(req, res) {
  var id = req.params.id;
  var wine = req.body;
  console.log('Updating wine: ' + id);
  console.log(JSON.stringify(wine));
  db.collection(BANDS, function(err, collection) {
    collection.update({'_id': new BSON.ObjectID(id)}, wine, {safe: true}, function(err, result) {
      if (err) {
        console.log('Error updating wine: ' + err);
        res.send({'error': 'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(wine);
      }
    });
  });
}

exports.deleteWine = function(req, res) {
  var id = req.params.id;
  console.log('Deleting wine: ' + id);
  db.collection(BANDS, function(err, collection) {
    collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
      if (err) {
        res.send({'error': 'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
}

var populateDB = function() {
  var bands = [
    {
      name: 'Wu-Tang Clan',
      albums: [],
      members: []
    },
    {
      name: 'The Police',
      albums: [],
      members: []
    }
  ];

  var members = [
    {
      name: 'Sting'
    },
    {
      name: 'Method Man'
    },
    {
      name: 'Ghostface Killah'
    }
  ];

  var albums = [
      {
        name: 'Synchronicity'
      }
  ];

  db.collection(BANDS, function(err, collection) {
    collection.insert(bands, {safe:true}, function(err, result) {});
  });
  db.collection(ALBUMS, function(err, collection) {
    collection.insert(albums, {safe:true}, function(err, result) {});
  });
  db.collection(MEMBERS, function(err, collection) {
    collection.insert(members, {safe:true}, function(err, result) {});
  });
};