import {observable, action, asMap} from "mobx"
import {t} from "../i18n/i18n"
import {AppStore} from "./AppStore"
import {User} from "../models/User"
import {Deserialize, Serialize} from "cerialize"
import {Submittable, Field} from "../data/Field"
import {Rules} from "../data/Rules"

export class LoginFormStore extends Submittable<Field> {

  public static readonly Name: string = "loginFormStore"

  @observable failed: boolean = false

  @observable fields = [
    Field.create(t("login.username"), [Rules.required, Rules.minLength(4), Rules.alphaNum]),
    Field.create(t("login.password"), [Rules.required, Rules.minLength(4)])
  ]

  constructor(private appStore: AppStore) {
    super()
  }

  @action login = (): void => {
    if (this.fields[0].value === "editor" && this.fields[1].value === "pass") {
      this.fakeLogin({
        "id": 16,
        "email": "editor@jim.com",
        "langCode": "en",
        "role": 4,
        "name": "Editor Jim"
      })
    } else if (this.fields[0].value === "writer" && this.fields[1].value === "pass") {
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