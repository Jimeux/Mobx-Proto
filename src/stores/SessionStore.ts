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
      this.errors.set("username", t("error.min_length", {min: 3}))
    else if (username.length > 100)
      this.errors.set("username", t("error.max_length", {max: 100}))
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
      this.errors.set("password", t("error.min_length", {min: 4}))
    else if (password.length > 100)
      this.errors.set("password", t("error.max_length", {max: 100}))
    else
      this.errors.delete("password")
  }

  errorFor = (key: string): string | null => {
    return this.errors.has(key) ? this.errors.get(key) : null
  }

  isValid = () => this.errors.size === 0 &&
    this.username != null && this.password.length > 0 && this.username.length > 0

  @action login = (): void => {
    if (this.username === "editor" && this.password === "pass") {
      this.fakeLogin({
        "id": 16,
        "email": "editor@jim.com",
        "langCode": "en",
        "role": 4,
        "name": "Editor Jim"
      })
    } else if (this.username === "writer" && this.password === "pass") {
      this.fakeLogin({
        "id": 17,
        "email": "writer@jim.com",
        "langCode": "en",
        "role": 1,
        "name": "Writer Jim"
      })
    } else {
      this.failed = true
      this.appStore.notify(t("login.error"))
    }
  }

  @action fakeLogin(json: any) {
      this.appStore.setCurrentUser(Deserialize(json, User))
      const userString = JSON.stringify(Serialize(this.appStore.currentUser))
      localStorage.setItem("user", userString)
      this.appStore.setPath(this.appStore.homePath)
      this.failed = false
  }

  @action logout = (): void => {
    localStorage.removeItem("user")
    window.location.href = "/login"
    this.appStore.setPath("/login")
  }

}