import {autoserialize} from "cerialize"

export enum TicketStatus {
  Writing   = 0,
  Editing   = 1,
  Published = 2
}

export interface TicketRequest {
  applicationId: number
  langCode: string
  comment: string | null
}

export class Ticket {
  @autoserialize readonly id: number
  @autoserialize readonly applicationId: number
  @autoserialize readonly articleId: number
  @autoserialize readonly status: number
  @autoserialize readonly comment: string | null

  constructor(id: number, applicationId: number, articleId: number,
              status: number, comment: string | null) {
    this.id = id
    this.applicationId = applicationId
    this.articleId = articleId
    this.status = status
    this.comment = comment
  }

}