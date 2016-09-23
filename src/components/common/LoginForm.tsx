import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {LoginFormStore} from "../../stores/LoginFormStore"
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
          <TextField type="text"
                     label={t("login.username")}
                     value={username.value}
                     error={username.error}
                     onChange={(e) => store.update("username", (e.target as HTMLInputElement).value)}/>

          <TextField type="password"
                     label={t("login.password")}
                     value={password.value}
                     error={password.error}
                     onChange={(e) => store.update("password", (e.target as HTMLInputElement).value)}/>

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

const TextField = ({type, label, error, onChange, value}) =>
  <div className={`text-field ${error ? "error" : ""}`}>
    <label>{label}{error}</label>
    <input type={type} onChange={onChange} value={value}/>
  </div>