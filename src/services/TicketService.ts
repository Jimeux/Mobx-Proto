import {BaseService} from "./BaseService"
import {Ticket} from "../models/Ticket"

export class TicketService extends BaseService {

  protected readonly BasePath: string = "tickets"

  get = async(id: number): Promise<Ticket> => {
    const ticketJson = await this.getRequest(`${id}`)
    return Ticket.create(ticketJson)
  }

  create = async(ticket: Ticket): Promise<Ticket> => {
    //const ticketJson = await this.getRequest(`${id}`)
    return Ticket.create(ticket)
  }

  index = async(page: number): Promise<Array<Ticket>> => {
    const ticketsJson = await this.getRequest(`?status=1&_page=${page}`)
    return ticketsJson.map(Ticket.create)
  }

}