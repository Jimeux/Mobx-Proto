import * as React from "react"
import {render} from "react-dom"
import {useStrict} from "mobx"
import {Provider} from "mobx-react"
import DevTools from "mobx-react-devtools"
import {browserHistory, Router} from "react-router"
import {routes} from "./routes"
import {stores} from "./stores"

import "./styles/main.scss"

useStrict(true)

render(
  <div>
    <DevTools/>
    <Provider {...stores}>
      <Router history={browserHistory}>
        {routes(stores.appStore)}
      </Router>
    </Provider>
  </div>,
  document.getElementById("root")
)