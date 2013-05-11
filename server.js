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
app.post('/bands', bandService.createBand);
app.put('/bands/:id', bandService.updateBand);
app.delete('/bands/:id', bandService.deleteBand);

app.get('/members', bandService.findAllMembers);
app.get('/members/:id', bandService.findMemberById);
app.post('/members', bandService.createMember);
app.put('/members/:id', bandService.updateMember);
app.delete('/members/:id', bandService.deleteMember);

app.get('/albums', bandService.findAllAlbums);
app.get('/albums/:id', bandService.findAlbumById);
app.post('/albums', bandService.createAlbum);
app.put('/albums/:id', bandService.updateAlbum);
app.delete('/albums/:id', bandService.deleteAlbum);

app.listen(3000);
console.log('Listening on port 3000...');
