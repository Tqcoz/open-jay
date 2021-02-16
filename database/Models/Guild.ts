import { Schema, Model, model as mModel } from "mongoose"
import { Guild } from '../../interfaces/Guild';
import * as crypto from 'crypto';
import Channel = require("./Channel");
const mongoose = require('mongoose')
const model:Model<Guild> = mModel('Guilds', new Schema({
  name: String,
  id: String,
  members: {
    ref: 'User',
    type: Array
  },
  channels: {
    ref: 'Channels',
    type: Array
  },
  roles: Array,
  invite: String
}))

export = {
  createGuild: async function (name: String) {
    let defaultChannelId = crypto.randomBytes(16).toString('hex')
    let defaultChannelTemplate:any = {
      name: 'general',
      id: defaultChannelId,
      messages: [],
      permission: []
    }
    let newGuild = await model.create({
      name: name,
      id: await crypto.randomBytes(16).toString('hex'),
      channels: [
        defaultChannelTemplate
      ]
    })
    await Channel.model.create(defaultChannelTemplate)
    return newGuild;
  },
  getGuildById: async function (id: string) {
      return await model.findOne({id}).catch(() => {})
  },
  model

}