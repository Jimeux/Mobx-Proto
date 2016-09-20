import {serialize} from "cerialize"

export default class User {
  @serialize readonly id: number
  @serialize readonly email: string
  @serialize readonly name: string
  @serialize readonly namae: string
  @serialize readonly avatar: string
  @serialize readonly department: string

  constructor(id: number, email: string, name: string,
              namae: string, avatar: string, department: string) {
    this.id = id
    this.email = email
    this.name = name
    this.namae = namae
    this.avatar = avatar
    this.department = department
  }

}