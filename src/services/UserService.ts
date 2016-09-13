import BaseService from "./BaseService"
import User from "../models/User"

export default class UserService extends BaseService {

  constructor() {
    super("users")
  }

  async get(id: number): Promise<User> {
    const userJson = await this.getRequest(`${id}`)
    return User.create(userJson)
  }

  async index(page: number): Promise<Array<User>> {
    const usersJson = await this.getRequest(`?page=${page}`)
    return usersJson.map(User.create)
  }

}