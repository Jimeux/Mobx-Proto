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

        {store.failed ? <h4>{t("login.error")}</h4> : null}

        <Input type="text"
               label={t("login.username")}
               error={store.errorFor("username")}
               onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>

        <Input type="password"
               label={t("login.password")}
               error={store.errorFor("password")}
               onChange={(e) => store.setPassword((e.target as HTMLInputElement).value)}/>

        <button onClick={() => store.login()}>
          {t("login.submit")}
        </button>

      </div>
    )
  }
}

const Input = ({type, label, error, onChange}) =>
  <div>
    <label>{label}{error}</label>
    <input type={type} onChange={onChange}/>
  </div>