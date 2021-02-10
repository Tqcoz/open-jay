require('./database')
// Imports
import * as express from 'express';
require('pug')
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
const api = require('./routes/api');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', api);
app.get('/', (req, res) => {
  res.render('index', {
    colors: require('colors')
  })
})

app.listen(80)
console.log('Running');
