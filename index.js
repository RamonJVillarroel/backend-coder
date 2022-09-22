const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const productos = require('./proapi/productos');

const apiRouter = require('./routers/app.routes');

const PORT = process.env.PORT || 8080;

const app = express();
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.resolve(__dirname, './hbs/layouts'),
  partialsDir: path.resolve(__dirname, './hbs/partials'),
})
);

const producto = new productos();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
//EJS
app.set('views', './ejs');
app.set('views engine', 'ejs');
app.get('/ejs',(req, res)=>{
  res.render('index.ejs', {produc: producto.listarTodos()});
});

app.post('/ejs', (req, res)=>{
 producto.guardar(req.body);
 res.redirect('/ejs');
});
//PUG
app.set('views', './pug');
app.set('views engine', 'pug');
app.get('/pug',(req, res)=>{
  res.render('index.pug', {produc: producto.listarTodos()});
});

app.post('/pug', (req, res)=>{
 producto.guardar(req.body);
 res.redirect('/pug');
});
//Handlerbars
app.set('views', './hbs');
app.set('views engine', 'hbs');
app.get('/hbs',(req, res)=>{
  res.render('index.hbs', {produc: producto.listarTodos()});
});

app.post('/hbs', (req, res)=>{
 producto.guardar(req.body);
 res.redirect('/hbs');
});

app.use("/api/productos",apiRouter);
const connectedServer = app.listen(PORT, () => {
  console.log('SERVIDOR ACTIVO');
});
connectedServer.on('ERROR', (error) => {
  console.log(error.message);
});
