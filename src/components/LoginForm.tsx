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
      <div className="login-form">
        {store.failed ? <h4>{t("login.error")}</h4> : null}

        <div className="form-group">
          <label>{t("login.username")}{store.errorFor("username")}</label>
          <input type="text"
                 className="form-control"
                 onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>
        </div>

        <div className="form-group">
          <label>{t("login.password")}{store.errorFor("password")}</label>
          <input type="password"
                 className="form-control"
                 onChange={(e) => store.setPassword((e.target as HTMLInputElement).value)}/>
        </div>

        <button className="btn btn-primary" onClick={() => store.login()}>
          {t("login.submit")}
        </button>

      </div>
    )
  }

}