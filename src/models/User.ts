import {autoserialize, autoserializeAs} from "cerialize"

export enum UserRole {
  Writer      = 1,
  Proofreader = 2,
  Editor      = 4,
  Chief       = 8
}

export class User {
  @autoserialize readonly id: number
  @autoserialize readonly email: string
  @autoserialize readonly name: string
  @autoserialize readonly namae: string
  @autoserialize readonly avatar: string
  @autoserialize readonly department: string
  @autoserializeAs(UserRole) readonly role: UserRole

  constructor(id: number, role: UserRole, email: string, name: string,
              namae: string, avatar: string, department: string) {
    this.id = id
    this.role = role
    this.email = email
    this.name = name
    this.namae = namae
    this.avatar = avatar
    this.department = department
  }

}