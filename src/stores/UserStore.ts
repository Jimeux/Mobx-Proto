import {observable, action} from "mobx"
import AppStore from "./AppStore"
import UserService from "../services/UserService"
import User from "../models/User"
import {t} from "../i18n/i18n"

export default class UserStore {

  public static readonly Name: string = "userStore"

  @observable users: Array<User> = []
  @observable user: User | null = null
  @observable loading: boolean = false

  private appStore: AppStore
  private userService: UserService

  constructor(appStore: AppStore, userService: UserService) {
    this.appStore = appStore
    this.userService = userService
  }

  @action setLoading = (loading: boolean) =>
    this.loading = loading

  fetchUser = async(id: number): Promise<void> => {
    const user = await this.userService.get(id)
    this.receiveUser(user)
  }

  @action receiveUser = (user: User) =>
    this.user = user

  fetchUsers = async(page: number = 1): Promise<void> => {
    try {
      this.setLoading(true)
      const users = await this.userService.index(page)

      if (users === null)
        this.appStore.setNotice(t("users.notice"))
      else
        setTimeout(() => this.receiveUsers(users), 2000)
    } catch (error) {
      this.appStore.setNotice(error.toString())
    }
  }

  @action receiveUsers = (users: Array<User>) => {
    this.setLoading(false)
    this.users = users
  }

  getUsers = (): Array<User> => {
    if (this.users.length === 0)
      this.fetchUsers()
    return this.users
  }

  isSelectedUser = (id: number): boolean =>
    this.user !== null && this.user.id === id

}