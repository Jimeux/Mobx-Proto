import * as React from "react"
import {browserHistory} from "react-router"

import {TicketService} from "./services/TicketService"
import {AppStore} from "./stores/AppStore"
import {SessionStore} from "./stores/SessionStore"
import {TicketStore} from "./stores/TicketStore"

const appStore = new AppStore(browserHistory)
const sessionStore = new SessionStore(appStore)
const ticketStore = new TicketStore(appStore, new TicketService())

export const stores = {appStore, sessionStore, ticketStore}