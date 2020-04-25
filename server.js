//dependencies

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 3000);
app.use('/static', express.static(__dirname +'/static'));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, 'index.html'));
    
});

server.listen(3000, function(){
    console.log('server start auf port 3000');
});
var nummer = 0;
var Spieler = {};
io.on('connection', function(socket){

    socket.on('new player', function() {
        if(nummer == 0){
                
        Spieler[socket.id] = {
            x: 0,
            y: 300
        };
    }
        if(nummer == 1){
            Spieler[socket.id] = {
                x: 550,
                y: 300,
            }
        }
        nummer++;
    });


    socket.on('bewegung', function(data){
        var player = Spieler[socket.id] || {} ;
        
          if (data.hoch) {
            player.y -= 5;
          }
          
          if (data.runter) {
            player.y += 5;
          }
    });
});

setInterval(function() {
    io.sockets.emit('state', Spieler);
  }, 1000 / 60);





  /*
  checken ob nummer = 2 ist für spiel Start
  ab punkt XY spielneustart nummer reset bedeutet reconnect*/
