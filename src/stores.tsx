import * as React from "react"
import {browserHistory} from "react-router"

import {TicketService} from "./services/TicketService"
import {AppStore} from "./stores/AppStore"
import {SessionStore} from "./stores/SessionStore"
import {TicketStore} from "./stores/TicketStore"
import {ArticleStore} from "./stores/ArticleStore";

const appStore = new AppStore(browserHistory)
const articleStore = new ArticleStore()
const sessionStore = new SessionStore(appStore)
const ticketStore = new TicketStore(appStore, new TicketService())

export const stores = {appStore, articleStore, sessionStore, ticketStore}