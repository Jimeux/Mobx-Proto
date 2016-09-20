import {observable, action, ObservableMap} from "mobx"
import {t} from "../i18n/i18n"
import {AppStore} from "./AppStore"
import {User} from "../models/User"
import {Deserialize, Serialize} from "cerialize"

export class SessionStore {

  public static readonly Name: string = "sessionStore"

  @observable errors = new ObservableMap<string>()
  @observable failed: boolean = false
  @observable username: string = ""
  @observable password: string = ""

  private appStore: AppStore

  constructor(appStore: AppStore) {
    this.appStore = appStore
  }

  @action setUsername = (username: string): void => {
    this.validateUsername(username)
    this.username = username
  }

  @action validateUsername = (username: string): void => {
    if (username.length < 3)
      this.errors.set("username", t("error.too_short", {min: 3}))
    else if (username.length > 100)
      this.errors.set("username", t("error.too_long", {max: 100}))
    else if (!(!!username.match(/^[_\-\w]+$/)))
      this.errors.set("username", t("error.alpha_num"))
    else
      this.errors.delete("username")
  }

  @action setPassword = (password: string): void => {
    this.validatePassword(password)
    this.password = password
  }

  @action validatePassword = (password: string): void => {
    if (password.length < 4)
      this.errors.set("password", t("error.too_short", {min: 4}))
    else if (password.length > 100)
      this.errors.set("password", t("error.too_long", {max: 100}))
    else
      this.errors.delete("password")
  }

  errorFor = (key: string): string | null => {
    return this.errors.has(key) ? this.errors.get(key) : null
  }

  isValid = () => this.errors.size === 0 &&
    this.username != null && this.password.length > 0 && this.username.length > 0

  @action login = (): void => {
    if (this.username === "jim" && this.password === "pass") {
      this.appStore.setCurrentUser(Deserialize({
        "id": 16,
        "role": 1,
        "avatar": "https://placehold.it/28x28",
        "department": "Development",
        "name": "Jim",
        "namae": "ジム"
      }, User))
      const userString = JSON.stringify(Serialize(this.appStore.currentUser))
      localStorage.setItem("user", userString)
      this.appStore.redirectHome()
      this.failed = false
    } else {
      this.failed = true
      this.appStore.setNotice(t("login.error"))
    }
  }

  @action logout = (): void => {
    localStorage.removeItem("user")
    window.location.href = "/login"
    this.appStore.setPath("/login")
  }

}