const express = require('express');

const http = require('http');

const app = express();
const server = http.createServer(app);
const qrcode = require('qrcode');
//const qrcode = require ('qrcode-terminal');
const routers = express.Router();
const mime = require('mime-types');
const Server = require("socket.io");
const path = require("path");

const  { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');


const io = Server(server)

const port = process.env.PORT || 3000 || 8000;
const bot = require('../bot');
const bot_basic = require('../bot_basic')


app.use(express.static(path.join(__dirname, "..")));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/socketio.html");
});


const client = new Client({
 // restartOnAuthFail: true,
  authStrategy: new LocalAuth({ clientId: 'cdbot' }),
  puppeteer: { headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ] }
});


io.on('connection', function(socket) {
  console.log(socket.id);
  socket.emit('message', '© BOT-CDB- Iniciado');
  socket.emit('message', socket.id)
  socket.emit('qr', './icon.svg');

 client.once('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
    socket.emit('qr',qr)
 });
 
client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  qrcode.toDataURL(qr, (err, url) => {
    socket.emit('qr', url);
    socket.emit('message', '© BOT-CDB QRCode recebido, aponte a câmera  seu celular!');
  });
});


client.on('ready', () => {
    socket.emit('ready', '© BOT-CDB Dispositivo pronto!');
    socket.emit('message', '© BOT-CDB Dispositivo pronto!');
    socket.emit('qr', './check.svg')	
    console.log('© BOT-CDB Dispositivo pronto');
});

client.on('authenticated', () => {
    socket.emit('authenticated', '© BOT-CDB Autenticado!');
    socket.emit('message', '© BOT-CDB Autenticado!');
    console.log('© BOT-CDB Autenticado');
});

client.on('auth_failure', function() {
    socket.emit('message', '© BOT-CDB Falha na autenticação, reiniciando...');
    console.error('© BOT-CDB Falha na autenticação');
});

client.on('change_state', state => {
  console.log('© BOT-CDB Status de conexão: ', state );
});

// client.on('disconnected', (reason) => {
//   socket.emit('message', '© BOT-ZDG Cliente desconectado!');
//   console.log('© BOT-CDB Cliente desconectado', reason);
  //client.initialize();
// });
//});


client.on('message_create', message => {
	console.log(message.body);
});

client.on('message_create', message => {
	if (message.body === 'Ping') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'Pong');
	}
});
client.on('message_create', message => {
	if (message.body === 'ping') {
		// reply back "pong" directly to the message
		message.reply('pong!');
	}
});
})

client.initialize();

server.listen(port, () => {
  console.log('server running at port: '+ port );
});
