const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const productos = require('./productos');
const memoria = require('./memoria');

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const productosApi = new productos();
const mensajesApi = new memoria('mensajes.json');


io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!');
  socket.emit('productos', productosApi.listarAll());
  socket.on('update', producto => {
      productosApi.guardar(producto)
      io.sockets.emit('productos', productosApi.listarAll());
  })
  socket.emit('mensajes', await mensajesApi.listarAll());
  socket.on('nuevoMensaje', async mensaje => {
      mensaje.fyh = new Date().toLocaleString()
      await mensajesApi.guardar(mensaje)
      io.sockets.emit('mensajes', await mensajesApi.listarAll());
  })
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));


const connectedServer = httpServer.listen(PORT, () => {
  console.log('SERVIDOR ACTIVO');
});
connectedServer.on('ERROR', (error) => {
  console.log(error.message);
});
