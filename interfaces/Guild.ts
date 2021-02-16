import { User } from './User'
import  {Channel } from './Channel'
import { Role } from './Role'
import { Document } from 'mongoose';

export interface Guild extends Document{
  name: String,
  id: String,
  members:  User,
  channels: Channel,
  roles: Array<Role>,
  invite: Array<object>

}