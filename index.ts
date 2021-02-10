// Imports
import * as express from 'express';
require('pug')
const api = require('./routes/api');
// Initializations 
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http, {
  cors: {
    origin: "http://localhost"
  }
});
const server = http.listen(3000, function() {
  console.log("Socket.Io on *:3000");
});
// Express Middlewares
app.set('view engine', 'pug')
app.use(express.json());
app.use('/api', api);
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.render('index', {
    colors: require('colors')
  })
})

app.listen(80)
console.log('Running');
