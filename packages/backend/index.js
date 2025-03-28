const express = require('express'); //express class
const app = express(); //constructor
const morgan = require('morgan'); //middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  return res.status(200).json({code : 200, message: 'Bienvenido a Clear Route'});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});
