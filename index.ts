// Imports

import * as express from 'express';
import * as socket from 'socket.io';
const io = new socket.Server().attach(2000)
// Route Imports
io.on('connection', (s) => {
  s.send('test')
})
import api from './routes/api';


// Initializations 
const app = express();


// Express Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
  
})
app.listen(80)