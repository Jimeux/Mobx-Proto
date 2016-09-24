import {observable, asMap, ObservableMap} from "mobx"
import {AppStore} from "./AppStore"
import {TicketService} from "../services/TicketService"
import {TicketRequest} from "../models/Ticket"
import {t} from "../i18n/i18n"
import {Field, Submittable} from "../data/Field"
import {Rules} from "../data/Rules"

export class TicketFormStore extends Submittable<Field> {

  public static readonly Name: string = "ticketFormStore"

  @observable fields: ObservableMap<Field> = asMap({
    applicationId: Field.create(t("ticket.create.applicationId"), [Rules.required, Rules.positiveInt]),
    comment: Field.create(t("ticket.create.comment"), [Rules.maxLength(300)])
  })

  constructor(private appStore: AppStore,
              private ticketService: TicketService) {
    super()
  }

  createTicket = async(): Promise<void> => {
    this.setLoading(true)
    const response = await this.ticketService.create(this.buildRequest())

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
    this.setLoading(false)
  }

  private buildRequest = (): TicketRequest => ({
    applicationId: parseInt(this.fields.get("applicationId").value),
    langCode: this.appStore.langCode,
    comment: this.fields.get("comment").value
  }) as TicketRequest

}