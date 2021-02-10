import * as express from 'express'
import { Router as r } from 'express'
var Router = r();
Router.use(express.json())
Router.use(express.urlencoded({extended: false}))
Router.get('/join', (req, res) => {
  
})
Router.post('/login', (req, res) => {
  console.log(req.body);
  res.json({
    status: 401,
    error: 'Invalid Email/Password'
  })
  
})
Router.use(express.static('./assets'))
export = Router;