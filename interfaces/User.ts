import { Guild } from './Guild'
import { Document } from 'mongoose'
import { User as U } from './User'
import { Channel } from './Channel';
import { Conversation } from './Conversation';
export interface User extends Document{
  id?: string,
  username?: string,
  discriminator?: string,
  avatar?: string,
  email?: string,
  password?: string,
  token?: string,
  conversations: Array<Conversation>,
  friends?: Array<this>,
  guilds?: Array<String>,
  requests: Array<String>
}