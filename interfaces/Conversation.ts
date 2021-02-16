import { User } from "./User";
import { Channel } from './Channel';

export interface Conversation{
  users: Array<User>,
  channel: Channel 
}