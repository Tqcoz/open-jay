// Imports

import * as express from 'express';
const socket = require('socket.io');

const api = require('./routes/api');


// Initializations 
const app = express();


// Express Middlewares

app.use(express.json())
app.use('/api', api)
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
  
})
app.listen(80)