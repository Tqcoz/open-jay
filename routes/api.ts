import * as express from 'express'
import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'
import { Router as r } from 'express'
const User = require('../database/User')
var Router = r();
const salt = "$2b$10$EJQ31SrNKhVIYQ5I/SORI.";
Router.use(express.json())
Router.use(express.urlencoded({extended: false}))
Router.post('/join', async (req, res) => {
  // Prototype, we're going to be making this more secure soon
  let tryUser = await User.model.findOne({ email: req.body.email }).catch(() => { })
  if (tryUser) {
    res.send({
      status: 401,
      error: 'User with Email already exists'
    })
  } else {
    User.model.create({
      id: await crypto.randomBytes(16).toString('hex'),
      username: req.body.username,
      email: req.body.email,
      password: (await bcrypt.hash(req.body.password, salt)).toString(),
      discriminator: await crypto.randomInt(9999).toString().padStart(4, '0')
    })
  }
})
Router.post('/login', async (req, res) => {
  let tryUser = await User.model.findOne({ email: req.body.email }).catch(() => { });
  if (!tryUser) {
    res.send({
      status: 401,
      error: 'Could not fetch User with the details'
    })
  } else {
    console.log('test');
    console.log(await bcrypt.compare(req.body.password, tryUser.password));
    
    if (await bcrypt.compare(req.body.password, tryUser.password)) {
      console.log(tryUser);
      
    } else {
      res.send({
        status: 401,
        error: 'Could not fetch User with the details'
      })
    }
  } 
  console.log(req.body);
  
  
})
Router.use(express.static('./assets'))
export = Router;