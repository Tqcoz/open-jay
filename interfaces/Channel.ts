import { Permission } from './Permission'
import { Message } from './Message';
import { Role } from './Role';
import { Document } from 'mongoose';
export interface Channel extends Document{
  name: string
  permission?: Array<Role> | Array<Permission>
  pinned?: Array<Message>
  description?: string
  id: string
  messages?: Array<Message>
}