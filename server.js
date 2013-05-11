var express = require('express'),
    bandService = require('./routes/band-server'),
    app = express();

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
});

app.get('/bands', bandService.findAllBands);
app.get('/bands/:id', bandService.findBandById);
//app.post('/bands', bandService.addWine);
//app.put('/bands/:id', bandService.updateWine);
//app.delete('/bands/:id', bandService.deleteWine);

app.get('/members', bandService.findAllMembers);
app.get('/members/:id', bandService.findMemberById);

app.get('/albums', bandService.findAllAlbums);
app.get('/albums/:id', bandService.findAlbumById);

app.listen(3000);
console.log('Listening on port 3000...');
