export interface UserJson {
  id: number
  email: string
  name: string
  namae: string
  avatar: string
  department: string
}

export default class User {
  readonly id: number
  readonly email: string
  readonly name: string
  readonly namae: string
  readonly avatar: string
  readonly department: string

  private constructor(id: number, email: string, name: string,
                      namae: string, avatar: string, department: string) {
    this.id = id
    this.email = email
    this.name = name
    this.namae = namae
    this.avatar = avatar
    this.department = department
  }

  static create(json: UserJson) {
    return new User(json.id, json.email, json.name,
      json.namae, json.avatar, json.department)
  }

}