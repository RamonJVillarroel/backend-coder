const express = require('express');
const apiRouter = require('./routers/app.routes');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json())//parsea lo que viene del cliente en json
app.use(express.urlencoded({extended: true}))//parsea los formularios // el extended parsea los datos complejos
app.use(express.static('public'));
app.use("/api/productos",apiRouter);
const connectedServer = app.listen(PORT, () => {
  console.log('SERVIDOR ACTIVO');
});
connectedServer.on('ERROR', (error) => {
  console.log(error.message);
});
