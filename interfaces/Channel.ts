import { Permission } from './Permission'
export interface Channel{
  name: string,
  permission: Array<Permission>,
  icon: string,
  description: string,
  nsfw: boolean
}