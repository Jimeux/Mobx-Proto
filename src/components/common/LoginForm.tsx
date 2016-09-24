import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {LoginFormStore} from "../../stores/LoginFormStore"
import {TextField} from "../../components/common/form/TextField"
import {t} from "../../i18n/i18n"
import {BoxForm} from "./form/BoxForm"

interface LoginFormProps {
  readonly loginFormStore: LoginFormStore
}

@observer([LoginFormStore.Name])
export class LoginForm extends Component<LoginFormProps, {}> {

  render() {
    const {fields, invalid, login} = this.props.loginFormStore
    const title = <span><span className="secondary">APPLIV</span><span>CLOUD</span></span>

    return (
      <BoxForm title={title}
               submit={t("login.submit")}
               onSubmit={login}
               disabled={invalid}>

        {fields.values().map((field, i) => <TextField key={i} field={field}/>)}

      </BoxForm>
    )
  }

}