import {observable, action, computed} from 'mobx'
import User from "../models/User";

export default class AppStore {

  @observable locale: string = "en"
  @observable currentUser: User | null = null
  @observable error: string | null = null

  private history

  constructor(history) {
    this.history = history
  }

  @action setPath = (path: string) =>
    this.history.replace(path)

  @action setLocale = (locale: string) =>
    this.locale = locale

  @action setCurrentUser = (user: User) =>
    this.currentUser = user

  @action setError = (message: string) =>
    this.error = message

  @computed get isAuthenticated(): boolean {
    return this.currentUser !== null
  }

}