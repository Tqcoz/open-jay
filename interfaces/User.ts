import { Guild } from './Guild'
import { Document } from 'mongoose'
import { User as U } from './User'
import { Channel } from './Channel';
export interface User extends Document{
  id?: string,
  username?: string,
  discriminator?: string,
  avatar?: string,
  email?: string,
  password?: string,
  token?: string,
  messages: Array<Channel>,
  friends?: Array<this>,
  guilds?: Array<Guild>,
  invitiations: Array<String>
}