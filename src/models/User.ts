import {autoserialize} from "cerialize"

export enum UserRole {
  Writer      = 1,
  Proofreader = 2,
  Editor      = 4,
  Chief       = 8
}

export class User {
  @autoserialize readonly id: number
  @autoserialize readonly email: string
  @autoserialize readonly langCode: string
  @autoserialize readonly name: string
  @autoserialize readonly role: number

  constructor(id: number, email: string, langCode: string, name: string, role: number) {
    this.id = id
    this.email = email
    this.langCode = langCode
    this.name = name
    this.role = role
  }

}