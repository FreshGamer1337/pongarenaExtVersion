const express =require('express');
const app = express();
const server = require('http').Server(app)
const socket = require("socket.io");
const io = socket(server);
// setzt den Port auf 3000
const port = 3000;
const path = require("path");

// sobald der Client connected wir die funktion newConnection()aufgerufen
io.sockets.on("connection", newConnection);

// gibt in der Konsole die Verbindungsid des verbundenen Clients an
function newConnection(socket){
    console.log(socket.id);
}

// öffnet beim localhost standardaufruf die starthtml datei auf
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/Website.html"));
});
;
// Ermöglichung zur Nutzung von JS, css und ähnliche dateien
app.use(express.static(__dirname + '/public'))

//Naricht das der Server gestartet hat
server.listen(port, () => console.log("Server gestartet"));


