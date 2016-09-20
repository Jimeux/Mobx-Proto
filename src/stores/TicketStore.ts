import {observable, action, reaction, runInAction} from "mobx"
import AppStore from "./AppStore"
import TicketService from "../services/TicketService"
import Ticket from "../models/Ticket"
import {t} from "../i18n/i18n"

export default class TicketStore {

  public static readonly Name: string = "ticketStore"

  @observable tickets: Array<Ticket> = []

  @observable initialised: boolean = false
  @observable loading: boolean = false
  @observable atEnd: boolean = false
  @observable page: number = 1

  private appStore: AppStore
  private ticketService: TicketService

  constructor(appStore: AppStore, ticketService: TicketService) {
    this.appStore = appStore
    this.ticketService = ticketService
  }

  @action setLoading = (loading: boolean) =>
    this.loading = loading

  fetchTickets = async(): Promise<void> => {
    if (this.loading)
      return
    try {
      this.setLoading(true)
      const tickets = await this.ticketService.index(this.page)

      if (tickets === null)
        this.appStore.setNotice(t("tickets.notice"))
      else
        setTimeout(() => this.receiveTickets(tickets), 0)
    } catch (error) {
      this.appStore.setNotice(error.toString())
    }
  }

  @action receiveTickets = (tickets: Array<Ticket>) => {
    this.initialised = true
    this.setLoading(false)
    if (tickets.length < 10)
      this.atEnd = true
    if (tickets.length > 0)
      this.tickets = tickets
  }

  getTickets = (): Array<Ticket> => {
    if (!this.atEnd && this.tickets.length === 0)
      this.fetchTickets()
    return this.tickets
  }

  @action pageUp = () => {
    if (this.loading || this.atEnd)
      return
    this.page += 1
    this.fetchTickets()
  }

  @action pageDown = () => {
    if (this.page > 1 && !this.loading) {
      this.page -= 1
      this.atEnd = false
      this.fetchTickets()
    }
  }

}