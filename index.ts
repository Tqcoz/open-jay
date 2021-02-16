require('mongoose')
require('./database')
const wrap = (middleware:any) => (s : any, next: any) => middleware(s.request, {}, next);

// Imports
import * as express from 'express';
import { MongooseDocument } from 'mongoose';
import { Socket } from 'socket.io';
require('pug')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const User = require('./database/Models/User')
const Guild = require('./database/Models/Guild')
const UserInterface = require('./interfaces/User')
const cookie = require('cookie')
const MongoStore = require('connect-mongodb-session')(require('express-session'))
const sessionStore = new MongoStore({dbName: 'ojay', collections: 'sessions'});
declare global {
  namespace Express {
    interface Request {
      propertyName: string; //or can be anythin
      user: typeof UserInterface,
      logout: Function
    }
    interface Session{
      token: String
    }
  }
}
console.log(new User.Class('4567'));

// Initializations 

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const http = require('http').createServer(app).listen(80);
const socket :any = require('socket.io')(http, {
  cors: {
    origin: "http://localhost"
  }
});
var COOKIE_SECRET = '264d46934673310ddd3ecab74d96297fb002fdba67165b8f';
var COOKIE_NAME = 'jay';
// Express Middlewares
app.set('view engine', 'pug')
app.use(cookieParser('264d46934673310ddd3ecab74d96297fb002fdba67165b8f'));
app.set('trust proxy', 1)

const api = require('./routes/api');
var bodyParser = require('body-parser')
const expressSession = require('express-session');
var session:any = expressSession({
  name: 'jay',
  store: sessionStore,
  secret: '264d46934673310ddd3ecab74d96297fb002fdba67165b8f',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 * 3 }
})

// parse application/json
app.use(bodyParser.json())
app.use(session)
// socket.use(require('express-socket.io-session')(session))

socket.use(function(io:any, next:any) {
  try {
      var data = io.handshake || io.request;
      if (! data.headers.cookie) {
          return next(new Error('Missing cookie headers'));
      }
      console.log('cookie header ( %s )', JSON.stringify(data.headers.cookie));
      var cookies = cookie.parse(data.headers.cookie);
      console.log('cookies parsed ( %s )', JSON.stringify(cookies));
      if (! cookies[COOKIE_NAME]) {
          return next(new Error('Missing cookie ' + COOKIE_NAME));
      }
      var sid = cookieParser.signedCookie(cookies[COOKIE_NAME], COOKIE_SECRET);
      if (! sid) {
          return next(new Error('Cookie signature is not valid'));
      }
      console.log('session ID ( %s )', sid);
      data.sid = sid;
      sessionStore.get(sid, function(err:any, session :any) {
          if (err) return next(err);
          if (! session) return next(new Error('session not found'));
          data.session = session;
          next();
      });
  } catch (err) {
      console.error(err.stack);
      next(new Error('Internal server error'));
  }
});
socket.on("connection", async function(io:any) {
  // Accept a login event with user's data
  if (io.handshake.session.token) {
    console.log('User has Session');
    let AllGuilds: any = []
    // for (let index = 0; index < io.user.guilds.length; index++) {
    //   let bo:any = io.user.guilds[index]
      
    //   console.log('Adding one Guild');
    //   console.log(await Guild.model.findOne({id: bo}))
    //   AllGuilds.push(await Guild.model.findOne({id: bo}))
    // }
    
    var addGuilds:any = {
      guilds: AllGuilds
    }
    function setGuilds() {
      console.log('teiushushsuyhiu');
    }
    io.emit('irc55', setGuilds.toString())

  }
  io.on('session', () => {
    console.log('test', io.handshake.session);
  })
  io.on('createGuild', async (e: any) => {
    let b = JSON.parse(e)
    if (io.user) {
      var t = await Guild.createGuild(b.data.name)
      var y :any = await User.model.findOneAndUpdate({ token: io.user.token },
        { "$push": { "guilds": t._id } },
        {"new": true, "upsert": true }
      )
      await User.model.findOne({ token: io.user.token }).populate()
    }
  })
  io.emit('irc03', "console.log('\x1b[34m%s\x1b[0m', '[𝓸-𝓳𝓪𝔂] Connection secured')")   
});
app.use(async function (req, res, next) {
  (req.session.token == undefined) ? null : req.user = res.locals.user = await User.getUserByToken(req.session.token).catch(() => { req.session.token = null;res.redirect('/login')});
  if (req.session?.token?.length > 3 && req.user?.id! == null) req.session.destroy(() => { });
  if (req.user) {
    req.logout = (token = req.session.token) => {
      User.model.findOne({token}).updateOne({token: undefined})
      req.user = null;
      req.session.token = null;
    }
  }
  res.locals.server = {
    Guild,
    User
  }
  next()
})

app.use('/api', api);
app.get('/@me', isAuthorized, (req, res) => {
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

app.get('/login', (req, res) => {
  res.render('login', {
    colors: require('colors')
  })
})
app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.render('logout')
  }else{
    res.redirect('/login')
  }
})
app.get('/register', (req, res) => {
  res.render('register', {
    colors: require('colors')
  })
})
function isAuthorized(req:any, res:any, next:any) {
  if (req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}
// app.use(function (err: any, req: any, res: any, next: any) {
//   if (err) {
//     if(req.url.split('/').includes('api')) return res.send({url: req.url, error: 'Something happened, have you sent the right request?'})
//   }
//   res.redirect("/?e=1")
// });
console.log('Running');
