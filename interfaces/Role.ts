import { Permission } from './Permission'
export interface Role{
  name: string,
  permission: Array<Permission>,
  color: string,
}