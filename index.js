//let shell = require("shelljs");
const cron = require("node-cron");
const express = require("express");
const path = require('path');
const morgan = require('morgan');
const Request = require("request");
const admin = require("firebase-admin");

 


//conectar y configurar la conexion a firebase
var serviceAccount = require("./conexiondemo-f29c7-firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://conexiondemo-f29c7.firebaseio.com"
});
const database = admin.database();


const app = express();
app.set('port', process.env.PORT || 4000);

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


// To backup a database
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  Request.get({
    "headers": { "content-type": "application/json" },
    "url": "https://api.myjson.com/bins//mpetd",
    "body": JSON.stringify({
     
    })
  }, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    console.log(JSON.parse(body));
    var respuesta = JSON.parse(body)

    var ref = database.ref("usuarios");
   
    ref.child(respuesta.Numero).set(respuesta);
  });
});


// Rutas de la aplicación(app)
app.use(require('./routes/'));//importar las rutas principales de index.js
//app.use(require('./routes/admin'));//importar las rutas de admin.js

//----Configurar directorio Public para la app
app.use(express.static(path.join(__dirname, 'src/public')));

//---- Iniciar el servidor
app.listen(app.get('port'), () => {
  //mandar mensaje de donde esta corriendo la app
  console.log("localhost levantado en :", app.get('port'));
});
