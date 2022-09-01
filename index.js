const express = require('express');
//const Contenedor = require('./master');
//let container = new Contenedor ('./producto.json');
let productos = require('./producto.json');
const PORT = process.env.PORT || 8080;
function productoAzar (data){
  return  data[Math.floor(Math.random() * data.length)]
}
const app = express();
app.get('/productos', (req, res) => {
   res.send(productos)
});
app.get('/productoRandon', (req, res) => {
   res.send(productoAzar(productos));
});
const connectedServer = app.listen(PORT, () => {
    console.log('SERVIDOR ACTIVO');
});
connectedServer.on('ERROR', (error) => {
    console.log(error.message);
});
