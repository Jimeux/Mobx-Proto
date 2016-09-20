export interface TicketJson extends Ticket {
}

export class Ticket {
  readonly id: number
  readonly appTitle: string
  readonly name: string
  readonly itemType: string
  readonly articleUnitPrice: string
  readonly firstDraftDue: string
  readonly articleType: string
  readonly gradeRange: string
  readonly status: string

  private constructor(id: number, appTitle: string, name: string,
              itemType: string, articleUnitPrice: string, firstDraftDue: string,
              articleType: string, gradeRange: string, status: string) {
    this.id = id
    this.appTitle = appTitle
    this.name = name
    this.itemType = itemType
    this.articleUnitPrice = articleUnitPrice
    this.firstDraftDue = firstDraftDue
    this.articleType = articleType
    this.gradeRange = gradeRange
    this.status = status
  }

  static create(json: TicketJson) {
    return new Ticket(json.id, json.appTitle, json.name,
      json.itemType, json.articleUnitPrice, json.firstDraftDue,
      json.articleType, json.gradeRange, json.status)
  }

}