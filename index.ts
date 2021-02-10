// Imports

import * as express from 'express';
import socket from 'socket.io';

// Route Imports

import api from './routes/api';


// Initializations 
const app = express();


// Express Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
  
})
app.listen(80)