import * as React from "react"
import {browserHistory} from "react-router"

import {TicketService} from "./services/TicketService"
import {AppStore} from "./stores/AppStore"
import {LoginFormStore} from "./stores/LoginFormStore"
import {TicketStore} from "./stores/TicketStore"
import {TicketFormStore} from "./stores/TicketFormStore"
import {ArticleFormStore} from "./stores/ArticleFormStore"
import {ArticleService} from "./services/ArticleService"

const ticketService = new TicketService()
const articleService = new ArticleService()

const appStore = new AppStore(browserHistory)
const articleFormStore = new ArticleFormStore(appStore, ticketService, articleService)
const ticketFormStore = new TicketFormStore(appStore, ticketService)
const loginFormStore = new LoginFormStore(appStore)
const ticketStore = new TicketStore(appStore, ticketService)

export const stores = {
  appStore, articleFormStore, loginFormStore, ticketStore, ticketFormStore
}