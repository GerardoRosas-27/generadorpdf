
const express = require("express");
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); //motor de plantillas


const app = express();
app.set('port', process.env.PORT || 4000);
//configurar rutas de las vistas
app.set('views',path.join(__dirname, 'views'));
//-- configurar motor de plantilla
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: ''
}));
app.set('view engine', '.hbs');


//-- middlewares de la cabecera
app.use((req, res, next) => {

  // Dominio que tengan acceso (ej. 'http://example.com')
     res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Metodos de solicitud que deseas permitir
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
     res.setHeader('Access-Control-Allow-Headers', '*');
  
  next();
  })


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Rutas de la aplicación(app)
app.use(require('./routes/'));//importar las rutas principales de index.js
//app.use(require('./routes/admin'));//importar las rutas de admin.js

//----Configurar directorio Public para la app
app.use(express.static(path.join(__dirname, 'public')));

//---- Iniciar el servidor
app.listen(app.get('port'), () => {
  //mandar mensaje de donde esta corriendo la app
  console.log("localhost levantado en :", app.get('port'));
});
