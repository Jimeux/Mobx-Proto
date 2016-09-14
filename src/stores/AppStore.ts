import {observable, action, computed} from "mobx"
import User from "../models/User"
import History from "react-router/lib/History"
import i18n from "../i18n/i18n"

export default class AppStore {

  @observable locale: string = i18n.language
  @observable currentUser: User | null = null
  @observable error: string | null = null

  private history: History

  constructor(history: History) {
    this.history = history
  }

  @action setPath = (path: string) =>
    this.history.replace(path)

  @action switchLocale = () => {
    const next = this.locale === "ja" ? "en" : "ja"
    i18n.changeLanguage(next)
    this.locale = next
  }

  @action setCurrentUser = (user: User) =>
    this.currentUser = user

  @action setError = (message: string) =>
    this.error = message

  @computed get isAuthenticated(): boolean {
    return this.currentUser !== null
  }

}