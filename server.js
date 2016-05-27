var express = require('express');
var app = express();//instancia al servidor express
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://aowifmczggrnyh:NiBV12ySLBfQRqTYICJ29BSyFT@ec2-50-19-227-171.compute-1.amazonaws.com:5432/d28kla667oav8r';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Puerto al servidor
var port = process.env.PORT || 5000;

app.get('/', function(req, res){
    res.send('API de Peliculas');
});

app.get('/peliculas', function(req,res){
  var students =[
    {
      "pelicula_id": 1,
      "year": 2016,
      "name":"Deadpool"
    },
    {
      "pelicula_id": 2,
      "year": 2016,
      "name":"Libro de la selva"
    },
  ];
  res.json(students);
});

app.post('/peliculas', function(req, res){
  var pelicula = {
      "pelicula_id": req.body.registration_number,
      "year": req.body.year,
      "name": req.body.name
  }

  pg.connect(connectionString, function(error, client, done){
   if (error){
     donde();
     console.log(error);
     res.status(500).json({"success": false, "data": error});
   }

    var query = client.query('INSERT INTO peliculas(pelicula_id, year, name)values($1, $2, $3), values [peliculas.pelicula_id, peliculas.year, peliculas.name];');
    query.on('end', function(){
      done();
      res.status(201).json(pelicula);
    });
  });

var query = 'SELECT * FROM peliculas WHERE pelicula_id = $1 AND year = $2 AND name = $3;';

client.query(query, values, function(error, result){
  done();
  if (error) {
      console.error('Error creando pelicula', error);
      res.status(500).json({
        "sucess": false,
        "message": error
      });
    }
    res.status(201).json(result,rows[0]);
  });
});

var server = app.listen(port, function(){
  var port = server.address().port;
  console.log('API en ejecucion en el puerto', port);
});
