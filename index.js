const express = require('express');
const Contenedor = require('../backend-coder-master/master');
let container = new Contenedor('./producto.json');
const PORT = process.env.PORT || 8080;

const app = express();
app.get('/productos', (req, res) => {
  container.getAll().then(azar => res.send(azar));
});
app.get('/productoRandon', (req, res) => {
container.productoAzar().then(azar => res.send(azar));
});
const connectedServer = app.listen(PORT, () => {
    console.log('SERVIDOR ACTIVO');
});
connectedServer.on('ERROR', (error) => {
    console.log(error.message);
});
