import {observable, action, ObservableMap} from "mobx"
import AppStore from "./AppStore"
import User from "../models/User"
import {UserJson} from "../models/User"

export default class SessionStore {

  @observable errors = new ObservableMap<string>()
  @observable failed: boolean = false
  @observable username: string = ""
  @observable password: string = ""

  private appStore: AppStore

  constructor(appStore: AppStore) {
    this.appStore = appStore
  }

  @action setUsername(username: string): void {
    this.validateUsername(username)
    this.username = username
  }

  @action validateUsername(username: string): void {
    if (username.length < 3)
      this.errors.set("username", "should be at least 3 characters long")
    else if (username.length > 100)
      this.errors.set("username", "should be no more than 100 characters long")
    else if (!(!!username.match(/^[_\-\w]+$/)))
      this.errors.set("username", "can contain only letters, numbers and - or _")
    else
      this.errors.delete("username")
  }

  @action setPassword(password: string): void {
    this.validatePassword(password)
    this.password = password
  }

  @action validatePassword(password: string): void {
    if (password.length < 4)
      this.errors.set("password", "should be at least 4 characters long")
    else if (password.length > 100)
      this.errors.set("password", "should be no more than 100 characters long")
    else
      this.errors.delete("password")
  }

  errorFor(key: string): string | null {
    return this.errors.has(key) ? this.errors.get(key) : null
  }

  @action login(): void {
    if (this.username === "jim" && this.password === "pass") {
      this.appStore.setCurrentUser(User.create(({
        "id": 16,
        "avatar": "https://placehold.it/28x28",
        "department": "Development",
        "name": "Jim",
        "namae": "ジム"
      } as UserJson)))
      this.appStore.setPath("/")
      this.failed = false
    } else {
      this.failed = true
    }
  }

}