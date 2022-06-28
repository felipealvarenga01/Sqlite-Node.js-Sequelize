const express = require('express');
const routes = require('./routes');
const porta = 3338 || process.env.PORT;
const morgan = require('morgan')
const bodyParser = require('body-parser');

require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(routes);

app.listen(porta, () => { console.log('Api online na rota: ' + porta) });