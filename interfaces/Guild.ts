import { User } from './User'
import  {Channel } from './Channel'
import { Role } from './Role'
export interface Guild{
  name: String,
  members:  User,
  channels: Channel,
  roles: Array<Role>,
  invite: Array<object>

}