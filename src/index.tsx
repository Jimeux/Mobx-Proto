import * as React from "react"
import {render} from "react-dom"
import {useStrict} from "mobx"
import {Provider} from "mobx-react"
import {Router, Route, IndexRoute, browserHistory} from "react-router"

import UserService from "./services/UserService"
import AppStore from "./stores/AppStore"
import SessionStore from "./stores/SessionStore"
import App from "./components/UserList"
import LoginForm from "./components/LoginForm"
import UserStore from "./stores/UserStore"
import NotFound from "./components/NotFound"
import MainLayout from "./components/MainLayout"

useStrict(true)

const appStore = new AppStore(browserHistory)
const sessionStore = new SessionStore(appStore)
const userStore = new UserStore(appStore, new UserService())

const stores = {appStore, sessionStore, userStore}

const authRequired = (nextState: Object, replace: Function) => {
  if (!appStore.isAuthenticated)
    replace("/login")
}

const root = document.getElementById("root")

if (root !== null) {
  render(
    <Provider {...stores} key={appStore.locale}>
      <Router history={browserHistory}>

        <Route component={MainLayout} onEnter={authRequired}>
          <Route path="/" component={App}/>
        </Route>

        <Route path="/login" component={LoginForm}/>
        <Route path="*" component={NotFound}/>

      </Router>
    </Provider>,
    root
  )
}