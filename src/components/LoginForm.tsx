import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import SessionStore from "../stores/SessionStore"
import {t} from "../i18n/i18n"

interface LoginFormProps {
  sessionStore: SessionStore
}

@observer(["sessionStore"])
export default class LoginForm extends Component<LoginFormProps, {}> {

  render() {
    const store = this.props.sessionStore

    return (
      <div>
        {store.failed ? <h4>{t("login.error")}</h4> : null}

        <label>
          {t("login.username")}{store.errorFor("username")}
        </label>

        <br/>

        <input type="text" onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>

        <br/>

        <label>
          {t("login.password")}{store.errorFor("password")}
        </label>

        <br/>

        <input type="password" onChange={(e) => store.setPassword((e.target as HTMLInputElement).value)}/>

        <br/>

        <button onClick={() => store.login()}>
          {t("login.submit")}
        </button>
      </div>
    )
  }

}