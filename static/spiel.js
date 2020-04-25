var socket= io();

var bewegung = {
    hoch: false,
    runter: false,
    
};

//erkennt tastendrücke
document.addEventListener('keydown', function(event){
    switch(event.keyCode){
    
    case 87: // W
      bewegung.hoch = true;
      break;
    case 83: // S
      bewegung.runter = true;
      break;
  
    }
});

//erkennt wenn taste wieder losgelassen wird
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
     
      case 87: // W
        bewegung.hoch = false;
        break;
      
      case 83: // S
        bewegung.runter = false;
        break;
    }
  });


socket.emit('new player');

    setInterval(function() {
    socket.emit('bewegung', bewegung);
    }, 1000 / 60);

    var canvas = document.getElementById('canvas');
    canvas.width = 600;
    canvas.height = 600;

    var ctx = canvas.getContext('2d');
    socket.on('state', function(Spieler){
        console.log(Spieler);
        ctx.clearRect(0, 0, 800, 600);
        ctx.fillStyle = 'green';
        for (var id in Spieler){
            var player = Spieler[id];
            ctx.beginPath();
            ctx.rect(player.x, player.y, 10, 40)
            ctx.fill();


        }
       });