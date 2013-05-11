var express = require('express'),
    band = require('./routes/band-server'),
    app = express();

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
});

app.get('/wines', band.findAll);
app.get('/wines/:id', band.findById);
app.post('/wines', band.addWine);
app.put('/wines/:id', band.updateWine);
app.delete('/wines/:id', band.deleteWine);

app.listen(3000);
console.log('Listening on port 3000...');
