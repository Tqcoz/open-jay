import { User } from './User'
import { Channel } from './Channel';

export interface Message{
  message: String,
  author: User,
  channel: Channel,
  attachments: String,
  createdAt: Date
}