import * as React from "react"
import {browserHistory} from "react-router"

import {TicketService} from "./services/TicketService"
import {AppStore} from "./stores/AppStore"
import {LoginFormStore} from "./stores/LoginFormStore"
import {TicketStore} from "./stores/TicketStore"
import {TicketFormStore} from "./stores/TicketFormStore"
import {ArticleStore} from "./stores/ArticleStore"

const ticketService = new TicketService()

const appStore = new AppStore(browserHistory)
const articleStore = new ArticleStore()
const ticketFormStore = new TicketFormStore(appStore, ticketService)
const loginFormStore = new LoginFormStore(appStore)
const ticketStore = new TicketStore(appStore, ticketService)

export const stores = {appStore, articleStore, loginFormStore, ticketStore, ticketFormStore}