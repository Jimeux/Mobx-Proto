import * as React from "react"
import {render} from "react-dom"
import {useStrict} from "mobx"
import {Provider} from "mobx-react"
import DevTools from "mobx-react-devtools"
import {Router, Route, browserHistory} from "react-router"

import TicketService from "./services/TicketService"
import AppStore from "./stores/AppStore"
import SessionStore from "./stores/SessionStore"
import App from "./components/TicketList"
import LoginForm from "./components/LoginForm"
import TicketStore from "./stores/TicketStore"
import NotFound from "./components/NotFound"
import MainLayout from "./components/MainLayout"

import "./styles/main.scss"

useStrict(true)

const appStore = new AppStore(browserHistory)
const sessionStore = new SessionStore(appStore)
const ticketStore = new TicketStore(appStore, new TicketService())

const stores = {appStore, sessionStore, ticketStore}

const authRequired = (nextState: Object, replace: Function) => {
  if (!appStore.isAuthenticated)
    replace("/login")
}

const root = document.getElementById("root")

if (root !== null) {
  render(
    <div>
      {/*<DevTools/>*/}

      <Provider {...stores}>
        <Router history={browserHistory}>
          <Route component={MainLayout}>
            <Route path="/" component={App} onEnter={authRequired}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="*" component={NotFound}/>
          </Route>
        </Router>
      </Provider>
    </div>,
    root
  )
}