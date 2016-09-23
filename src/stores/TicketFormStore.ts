import {observable, action, asMap} from "mobx"
import {AppStore} from "./AppStore"
import {TicketService} from "../services/TicketService"
import {TicketRequest} from "../models/Ticket"
import {t} from "../i18n/i18n"
import {Field, Submittable} from "../data/Field"
import {Rules} from "../data/Rules"

export class TicketFormStore extends Submittable {

  public static readonly Name: string = "ticketFormStore"

  @observable fields = asMap({
    applicationId: Field.create([Rules.required, Rules.integer]),
    comment: Field.create([Rules.maxLength(300)])
  })

  constructor(private appStore: AppStore,
              private ticketService: TicketService) {
    super()
  }

  createTicket = async(): Promise<void> => {
    const response = await this.ticketService.create(this.toJson())

    if (response == null || response.status > 400)
      this.appStore.notify(t("error.unexpected"))
    else {
      const json = await response.json()
      if (response.ok) {
        this.appStore.notify(t("ticket.create.success", {id: json.id}))
        this.reset()
      } else {
        this.appStore.notify(JSON.stringify(json))
      }
    }
  }

  private toJson = (): TicketRequest => ({
    applicationId: parseInt(this.fields.get("applicationId").value),
    langCode: this.appStore.langCode,
    comment: this.fields.get("comment").value
  }) as TicketRequest

}