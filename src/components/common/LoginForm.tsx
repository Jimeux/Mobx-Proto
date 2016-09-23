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
    const {fields, invalid, login} = this.props.loginFormStore

    return (
      <div className="login-form">
        <div className="header">
          <span className="secondary">APPLIV</span><span>CLOUD</span>
        </div>
        <div className="body">

          {fields.map((field, i) => <TextField key={i} field={field}/>)}

          <div className="submit">
            <button onClick={login} disabled={invalid}>
              {t("login.submit")}
            </button>
          </div>
        </div>
      </div>
    )
  }

}