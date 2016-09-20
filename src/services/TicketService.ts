import BaseService from "./BaseService"
import Ticket from "../models/Ticket"

export default class TicketService extends BaseService {

  constructor() {
    super("tickets")
  }

  get = async(id: number): Promise<Ticket> => {
    const ticketJson = await this.getRequest(`${id}`)
    return Ticket.create(ticketJson)
  }

  index = async(page: number): Promise<Array<Ticket>> => {
    const ticketsJson = await this.getRequest(`?_page=${page}`)
    return ticketsJson.map(Ticket.create)
  }
/*
  create {
  POST  /tickets                          controllers.TicketController.create()

  "applicationId" -> longNumber,
  "langCode" -> text,
  "comment" -> optional(text)*/
//}

}