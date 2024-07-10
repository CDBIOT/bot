const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const qrcode = require ('qrcode-terminal');
const  { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const socketIO = require('socket.io');

const port = process.env.PORT || 3000 || 8000;
const io = socketIO(server);



function bot_basic(){

//app.use("/", express.static(__dirname + "/"))

app.get('/', (req, res) => {
  res.sendFile('socketio.html', {
    root: __dirname
  });
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


client.initialize();


io.on('connection', function(socket) {
  socket.emit('message', '© BOT-CDB- Iniciado');
  socket.emit('qr', 'http://localhost:3000/icon.svg');

 client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
 });

client.on('ready', () => {
    socket.emit('ready', '© BOT-CDB Dispositivo pronto!');
    socket.emit('message', '© BOT-CDB Dispositivo pronto!');
    socket.emit('qr', '/check.svg')	
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
// Start your client
//client.initialize();

// server.listen(port, () => {
//   console.log('server running at port: '+ port );
// });
}
module.exports={bot_basic}