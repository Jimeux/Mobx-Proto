import * as React from "react"
import {browserHistory} from "react-router"

import {TicketService} from "./services/TicketService"
import {AppStore} from "./stores/AppStore"
import {SessionStore} from "./stores/SessionStore"
import {TicketStore} from "./stores/TicketStore"
import {TicketFormStore} from "./stores/TicketFormStore"
import {ArticleStore} from "./stores/ArticleStore"

const ticketService = new TicketService()

const appStore = new AppStore(browserHistory)
const articleStore = new ArticleStore()
const ticketFormStore = new TicketFormStore(appStore, ticketService)
const sessionStore = new SessionStore(appStore)
const ticketStore = new TicketStore(appStore, ticketService)

export const stores = {appStore, articleStore, sessionStore, ticketStore, ticketFormStore}