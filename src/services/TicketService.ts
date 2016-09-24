import {BaseService} from "./BaseService"
import {Ticket, TicketJson} from "../models/Ticket"
import {Deserialize} from "cerialize"

export class TicketService extends BaseService {

  protected readonly BasePath: string = "tickets"

  async get(id: number): Promise<Ticket> {
    const response = await this.getRequest(`/${id}`)
    const ticketJson = await response.json()
    return Deserialize(ticketJson, Ticket)
  }

  async create(ticket: any): Promise<Response | null> {
    return await this.postRequest("/", JSON.stringify(ticket))
  }

  async advance(id: number): Promise<Response | null> {
    return await this.putRequest(`/${id}/progress`, JSON.stringify({}))
  }

  async index (page: number): Promise<Array<Ticket>> {
    const response = await this.getRequest(`/status/0`)
    const ticketsJson = await response.json()
    return ticketsJson.map(ticket => Deserialize(ticket, Ticket))
  }

}