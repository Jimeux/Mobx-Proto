import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {LoginFormStore} from "../../stores/LoginFormStore"
import {TextField} from "../../components/common/form/TextField"
import {t} from "../../i18n/i18n"

interface LoginFormProps {
  loginFormStore: LoginFormStore
}

@observer([LoginFormStore.Name])
export class LoginForm extends Component<LoginFormProps, {}> {
  render() {
    const store = this.props.loginFormStore
    const username = store.fields.get("username")
    const password = store.fields.get("password")

    return (
      <div className="login-form">
        <div className="header">
          <span className="secondary">APPLIV</span><span>CLOUD</span>
        </div>
        <div className="body">
          <TextField field={username}/>
          <TextField field={password}/>
          <div className="submit">
            <button onClick={store.login} disabled={store.invalid}>
              {t("login.submit")}
            </button>
          </div>
        </div>
      </div>
    )
  }
}