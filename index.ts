require('mongoose')
require('./database')
// Imports
import * as express from 'express';
require('pug')
const User = require('./database/User')
const UserInterface = require('./interfaces/User')
declare global {
  namespace Express {
    interface Request {
      propertyName: string; //or can be anythin
      user: typeof UserInterface
    }
    interface Session{
      token: String
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
// parse application/json
app.use(bodyParser.json())
app.use(session({
  name: 'jay',
  secret: '264d46934673310ddd3ecab74d96297fb002fdba67165b8f',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 * 3 }
}))
app.use(async function (req, res, next) {
  (req.session.token == undefined) ? null : req.user = res.locals.user = await User.getUserByToken(req.session.token);
  next()
})
app.use('/api', api);
app.get('/@me', (req, res) => {
  res.render('user-dashboard', {
    colors: require('colors')
  })
})
app.get('/', (req, res) => {
  console.log(req.session);
  console.log(req.user);
  
  res.render('index', {
    colors: require('colors')
  })
})

app.listen(80)
console.log('Running');
