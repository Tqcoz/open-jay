import * as express from 'express'
import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'
import { Router as r } from 'express'
const User = require('../database/Models/User')
var Router = r();
const salt = "$2b$10$EJQ31SrNKhVIYQ5I/SORI.";
Router.post('/join', async (req, res) => {
  console.log(req.body);
  // Prototype, we're going to be making this more secure soon
  try {
    let tryUser = await User.model.findOne({ email: req.body[1] }).catch(() => { })
    if (tryUser) {
      res.send({
        status: 401,
        error: 'User with Email already exists'
      })
    } else {
      User.model.create({
        id: await crypto.randomBytes(16).toString('hex'),
        username: req.body[0].replace('#', ''),
        email: req.body[1],
        password: (await bcrypt.hash(req.body[2], salt)).toString(),
        discriminator: await crypto.randomInt(9999).toString().padStart(4, '0')
      })
      res.send({
        status: 200, 
        url: `http://localhost/login`
      })
    }
  } catch (error) {
    console.log(error);
    
    res.send({
      status: 401,
      error: 'Error Occured'
    })
  }
})
Router.post('/login', async (req, res) => {
  var beq = {
    body: {
      email: req.body[0],
      password: req.body[1],
    }
  }
  let tryUser = await User.model.findOne({ email: beq.body.email }).catch(() => { });
  if (!tryUser) {
    res.send({
      status: 401,
      error: 'Could not fetch User with the details'
    })
  } else {
    
    if (await bcrypt.compare(beq.body.password, tryUser.password)) {
      let token : String = crypto.randomBytes(32).toString('hex');
      
      await tryUser.updateOne({
        token
      })
      console.log('Saved to Session');
      
      req!.session.token = token;
      req.session.save(function () { }) // Requires Callback
      res.send({
        status: 200,
        url: `http://localhost/@me`
      })
    } else {
      res.send({
        status: 401,
        error: 'Could not fetch User with the details'
      })
    }
  } 
  
  
})
Router.use(express.static('./assets'))
export = Router;