const express = require('express');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const Products= require('./proapi/productos');
const Messages = require('./proapi/memoria')
const dbConfig = require ('./dataBase/config');
const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const productsDB = new Products('productos', dbConfig.mariaDB);
const messagesDB = new Messages("messages", dbConfig.sqlite);


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
const users = [];

io.on("connection", async (socket) => {
    console.log(`New User conected!`);
   const products = await productsDB.getAll();
   socket.emit('productos', products);

   socket.on('newProduct', async (newProduct) => {
       await productsDB.save(newProduct);
       const updateProducts = await productsDB.getAll(); 
       io.emit('products', updateProducts)      
    });   


    socket.on("new-user", (username) => {
     const newUser = {
       id: socket.id,
       username: username,
     };
     users.push(newUser);
    });
    
    const messages= await messagesDB.getMessages();
    socket.emit("messages", messages);
 
    socket.on("new-message", async (msj) => {
        await messagesDB.addMessage({email: msj.user, message: msj.message, date: new Date().toLocaleDateString()});
        const messagesLog = await messagesDB.getMessages();
        io.emit("messages", {messagesLog});
    })
})


const connectedServer = httpServer.listen(PORT, () => {
  console.log('SERVIDOR ACTIVO');
});
connectedServer.on('ERROR', (error) => {
  console.log(error.message);
});
