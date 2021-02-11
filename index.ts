require('mongoose')
require('./database')
// Imports
import * as express from 'express';
require('pug')
const User = require('./database/User')
declare global {
  namespace Express {
    interface Request {
      propertyName: string; //or can be anythin
    }
  }
}
console.log(new User.Class('4567'));

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
const session = require('express-session');
import { Session } from 'express-session'

declare module 'express-session' {
 interface Session {
    token: string;
  }
}
// parse application/json
app.use(bodyParser.json())
app.use(session({
  secret: '264d46934673310ddd3ecab74d96297fb002fdba67165b8f',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use('/api', api);
app.get('/', (req, res) => {
  console.log(req.session);
  
  res.render('index', {
    colors: require('colors')
  })
})

app.listen(80)
console.log('Running');
