import { Guild } from './Guild'
import { Document } from 'mongoose'
export interface User extends Document{
  id?: string,
  username?: string,
  discriminator?: string,
  avatar?: string,
  email?: string,
  password?: string,
  token?: string,
  friends?: Array<this>,
  guilds?: Array<Guild>
}