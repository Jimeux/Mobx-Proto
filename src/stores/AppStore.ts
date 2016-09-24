import {observable, action, computed} from "mobx"
import History from "react-router/lib/History"
import {Deserialize} from "cerialize"
import {i18n, t} from "../i18n/i18n"
import {User, UserRole} from "../models/User"

export class AppStore {

  public static readonly Name: string = "appStore"

  @observable locale: string = i18n.language
  @observable currentUser: User | null = null
  @observable notice: string | null = null
  @observable menuIsOpen: boolean = false

  private history: History
  private clearNoticeTimeout: any

  constructor(history: History) {
    this.history = history
    this.restoreUser()
  }

  @action setPath = (path: string) =>
    this.history.push(path)

  public get homePath(): string {
    if (this.currentUser == null)
      return "login"

    switch (this.currentUser.role) {
      case UserRole.Proofreader: return "proofreader"
      case UserRole.Editor:      return "editor"
      case UserRole.Chief:       return "chiefs"
      default:                   return "writer"
    }
  }

  @action switchLocale = () => {
    const next = this.locale === "ja" ? "en" : "ja"
    i18n.changeLanguage(next)
    this.locale = next
  }

  @action restoreUser = () => {
    const userString = localStorage.getItem("user")
    if (userString != null) {
      this.currentUser = Deserialize(JSON.parse(userString))
    }
  }

  @action setCurrentUser = (user: User) =>
    this.currentUser = user

  @computed get langCode(): string {
    return this.currentUser == null ? "en" : this.currentUser.langCode
  }

  @action notify = (notice: string) => {
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

  isAuthenticated = (): boolean =>
  this.currentUser != null

  isAuthorizedFor = (role: UserRole): boolean =>
  this.currentUser != null && this.currentUser.role >= role

  notAuthorizedFor = (role: UserRole): boolean =>
    !(this.isAuthorizedFor(role))

}