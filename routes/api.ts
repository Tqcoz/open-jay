import * as express from 'express'
import { Router as r } from 'express'
var Router = r()
Router.get('/join', (req, res) => {
  
})
Router.use(express.static('./assets'))
export = Router;