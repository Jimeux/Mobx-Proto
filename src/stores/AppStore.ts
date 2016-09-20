import {observable, action, computed} from "mobx"
import History from "react-router/lib/History"
import {Deserialize} from "cerialize"
import {i18n, t} from "../i18n/i18n"
import {User} from "../models/User"

export class AppStore {

  public static readonly Name: string = "appStore"

  @observable locale: string = i18n.language
  @observable currentUser: User | null = null
  @observable notice: string | null = null
  @observable menuIsOpen: boolean = false

  private history: History
  private clearNoticeTimeout: number

  constructor(history: History) {
    this.history = history
    this.restoreUser()
  }

  @action setPath = (path: string) =>
    this.history.replace(path)

  @action switchLocale = () => {
    const next = this.locale === "ja" ? "en" : "ja"
    i18n.changeLanguage(next)
    this.locale = next
  }

  @action restoreUser = () => {
    const userJson = localStorage.getItem("user")
    if (userJson != null)
      this.currentUser = Deserialize(userJson)
  }

  @action setCurrentUser = (user: User) =>
    this.currentUser = user

  @action setNotice = (notice: string) => {
    this.notice = notice
    clearTimeout(this.clearNoticeTimeout)
    this.clearNoticeTimeout = setTimeout(this.clearNotice, 5000)
  }

  @action clearNotice = () =>
    this.notice = null

  @action openMenu = () =>
    this.menuIsOpen = true

  @action closeMenu = () =>
    this.menuIsOpen = false

  @computed get isAuthenticated(): boolean {
    return this.currentUser !== null
  }

}