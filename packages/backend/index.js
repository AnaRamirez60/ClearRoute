const express = require('express'); //express class
const app = express(); //constructor
const morgan = require('morgan'); //middleware
const conductoresRutas = require('./src/routes/conductoresRutas.js'); //rutas
const contenedoresRutas = require('./src/routes/contenedoresRutas.js'); //rutas
const formulariosRutas = require('./src/routes/formulariosRutas.js');
const lecturasRutas = require('./src/routes/lecturasRutas.js'); // Importar las rutas de lecturas
const tareasRutas = require('./src/routes/tareasRutas.js'); // Importar las rutas de tareas
const rutasRutas = require('./src/routes/rutasRutas.js'); // Importar las rutas de rutas
const sensoresRutas = require('./src/routes/sensoresRutas.js'); // Importar las rutas de sensores

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  return res.status(200).json({code : 200, message: 'Bienvenido a Clear Route'});
});

app.use('/conductores', conductoresRutas);  
app.use('/contenedores', contenedoresRutas);
app.use('/formularios', formulariosRutas);
app.use('/lecturas', lecturasRutas); // Añadir las rutas de lecturas
app.use('/tareas', tareasRutas); // Añadir las rutas de tareas
app.use('/rutas', rutasRutas); // Añadir las rutas de rutas
app.use('/sensores', sensoresRutas); // Añadir las rutas de sensores


app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});


// ... Código existente ...




