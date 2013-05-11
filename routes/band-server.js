var mongo = require('mongodb');
var _ = require("underscore");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    BANDS = 'bands',
    MEMBERS = 'members',
    ALBUMS = 'albums';

var bandApp = {};

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('banddb', server);

db.open(function(err, db) {
  if (!err) {
    console.log("Connected to 'banddb' database");
    db.collection(BANDS, {strict: true}, function(err, collection) {
      if (err) {
        console.log("The collection does not exist, creating a new one");
        populateDB();
      }
    });
  }
});

bandApp.findAll = function(collectionName, req, res) {
  console.log('Find all', collectionName);
  db.collection(collectionName, function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

bandApp.findById = function(collectionName, req, res) {
  var id = req.params.id;
  console.log('Find by id', collectionName, id);
  db.collection(collectionName, function(err, collection) {
    collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
      res.send(item);
    });
  });
};

bandApp.createItem = function(collectionName, req, res) {
  var item = req.body;
  console.log('Adding item', collectionName, JSON.stringify(item));
  db.collection(collectionName, function(err, collection) {
    collection.insert(item, {safe: true}, function(err, result) {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
};

bandApp.updateItem = function(collectionName, req, res) {
  var id = req.params.id;
  var item = req.body;
  console.log('Updating item', collectionName, id);
  console.log(JSON.stringify(item));
  db.collection(collectionName, function(err, collection) {
    collection.update({'_id': new BSON.ObjectID(id)}, item, {safe: true}, function(err, result) {
      if (err) {
        console.log('Error updating item: ' + err);
        res.send({'error': 'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(item);
      }
    });
  });
};

bandApp.deleteItem = function(collectionName, req, res) {
  var id = req.params.id;
  console.log('Deleting item', collectionName, id);
  db.collection(collectionName, function(err, collection) {
    collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
      if (err) {
        res.send({'error': 'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
};




// Find all.
exports.findAllBands = _.partial(bandApp.findAll, BANDS);
exports.findAllAlbums = _.partial(bandApp.findAll, ALBUMS);
exports.findAllMembers = _.partial(bandApp.findAll, MEMBERS);

// Find by id.
exports.findBandById = _.partial(bandApp.findById, BANDS);
exports.findAlbumById = _.partial(bandApp.findById, ALBUMS);
exports.findMemberById = _.partial(bandApp.findById, MEMBERS);

// Create
exports.createBand = _.partial(bandApp.createItem, BANDS);
exports.createAlbum = _.partial(bandApp.createItem, ALBUMS);
exports.createMember = _.partial(bandApp.createItem, MEMBERS);

// Update
exports.updateBand = _.partial(bandApp.updateItem, BANDS);
exports.updateAlbum = _.partial(bandApp.updateItem, ALBUMS);
exports.updateMember = _.partial(bandApp.updateItem, MEMBERS);

// Delete
exports.deleteBand = _.partial(bandApp.deleteItem, BANDS);
exports.deleteAlbum = _.partial(bandApp.deleteItem, ALBUMS);
exports.deleteMember = _.partial(bandApp.deleteItem, MEMBERS);



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