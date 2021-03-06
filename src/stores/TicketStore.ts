import {observable, action, computed, asFlat, IObservableArray} from "mobx"
import {AppStore} from "./AppStore"
import {TicketService} from "../services/TicketService"
import {Ticket, TicketStatus} from "../models/Ticket"
import {t} from "../i18n/i18n"

export class TicketStore {

  public static readonly Name: string = "ticketStore"

  @observable tickets: IObservableArray<Ticket> = (new Array(10) as IObservableArray<Ticket>)

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

  fetchTickets = async(status: TicketStatus): Promise<void> => {
    if (this.loading)
      return
    try {
      this.setLoading(true)
      const tickets = await this.ticketService.index(status, this.page)

      if (tickets === null)
        this.appStore.notify(t("tickets.notice"))
      else
        this.receiveTickets(tickets)
    } catch (error) {
      this.appStore.notify(error.toString())
    }
  }

  @action receiveTickets = (tickets: Array<Ticket>) => {
    this.setLoading(false)
    if (tickets.length > 0) {
      this.tickets.replace(tickets)
      this.atEnd = false
      this.page = 1
    }
  }

  @action pageUp = () => {
    if (this.page * 10 > this.tickets.length - 1)
      return
    this.page += 1

  }

  @computed get currentTickets() {
    let start = this.page * 10 - 10
    return this.tickets.slice(start, start + 10)
  }

  @computed get size() {
    return this.tickets.length
  }

  @action pageDown = () => {
    if (this.page > 1) {
      this.page -= 1
      this.atEnd = false
    }
  }

}