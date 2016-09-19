import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import SessionStore from "../stores/SessionStore"
import {t} from "../i18n/i18n"

interface LoginFormProps {
  sessionStore: SessionStore
}

@observer([SessionStore.Name])
export default class LoginForm extends Component<LoginFormProps, {}> {
  render() {
    const store = this.props.sessionStore

    return (
      <div className="login-form">

        <div className="header">
          <span className="secondary">APPLIV</span><span>CLOUD</span>
        </div>

        <div className="body">
          <TextField type="text"
                     label={t("login.username")}
                     error={store.errorFor("username")}
                     onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>

          <TextField type="password"
                     label={t("login.password")}
                     error={store.errorFor("password")}
                     onChange={(e) => store.setPassword((e.target as HTMLInputElement).value)}/>

          <div className="submit">
            <button onClick={() => store.login()} disabled={!store.isValid()}>
              {t("login.submit")}
            </button>
          </div>
        </div>

      </div>
    )
  }
}

const TextField = ({type, label, error, onChange}) =>
  <div className={`text-field ${error ? "error" : ""}`}>
    <label>{label}{error}</label>
    <input type={type} onChange={onChange}/>
  </div>