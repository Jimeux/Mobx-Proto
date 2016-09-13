import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import SessionStore from "../stores/SessionStore"

interface LoginFormProps {
  sessionStore: SessionStore
}

@observer(["sessionStore"])
export default class LoginForm extends Component<LoginFormProps, {}> {

  render() {
    const store = this.props.sessionStore

    return (
      <div>
        {store.failed ? <h4>Invalid username or password</h4> : null}

        <label>
          Username {store.errorFor("username")}
        </label>

        <br/>

        <input type="text" onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>

        <br/>

        <label>
          Password {store.errorFor("password")}
        </label>

        <br/>

        <input type="password" onChange={(e) => store.setPassword((e.target as HTMLInputElement).value)}/>

        <br/>

        <button onClick={() => store.login()}>Login</button>
      </div>
    )
  }

}