import {observable, action} from "mobx"
import AppStore from "./AppStore"
import UserService from "../services/UserService"
import User from "../models/User"
import {t} from "../i18n/i18n"

export default class UserStore {

  @observable users: Array<User> = []
  @observable user: User | null = null

  private appStore: AppStore
  private userService: UserService

  constructor(appStore: AppStore, userService: UserService) {
    this.appStore = appStore
    this.userService = userService
  }

  async fetchUser(id: number): Promise<void> {
    const user = await this.userService.get(id)
    this.receiveUser(user)
  }

  @action receiveUser = (user: User) =>
    this.user = user

  async fetchUsers(page: number = 1): Promise<void> {
    try {
      const users = await this.userService.index(page)

      if (users === null)
        this.appStore.setError(t("users.error"))
      else
        this.receiveUsers(users)
    } catch (error) {
      this.appStore.setError(error.toString())
    }
  }

  @action receiveUsers = (users: Array<User>) =>
    this.users = users

  getUsers = (): Array<User> => {
    if (this.users.length === 0)
      this.fetchUsers()
    return this.users
  }

  isSelectedUser = (id: number): boolean =>
    this.user !== null && this.user.id === id

}