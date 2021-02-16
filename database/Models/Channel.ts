import { Schema, Model, model as mModel } from "mongoose"
import { Channel } from '../../interfaces/Channel';
const mongoose = require('mongoose')
const model:Model<Channel> = mModel('Channels', new Schema({
  name: String,
  id: String,
  permission: Array,
  pinned: Array,
  description: String,
  messages: Array
}))
export = {
    getChannelById: async function (id: string) {
        return await model.findOne({id}).catch(() => {})
    },
    model

}