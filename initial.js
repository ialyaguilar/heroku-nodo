var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://aowifmczggrnyh:NiBV12ySLBfQRqTYICJ29BSyFT@ec2-50-19-227-171.compute-1.amazonaws.com:5432/d28kla667oav8r';//instancia al servidor express

//Puerto al servidor
var pgClient = new pg.Client(connectionString);

pgClient.connect();

var query = pgClient.query('CREATE TABLE peliculas(pelicula_id INTEGER NOT NULL, year INTEGER NOT NULL, name "char"[20] NULL)');

query.on('end', function(){
   pgClient.end();
});
