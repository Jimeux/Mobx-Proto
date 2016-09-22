import {observable, action, computed} from "mobx"
import {AppStore} from "./AppStore"
import {TicketService} from "../services/TicketService"
import {TicketRequest} from "../models/Ticket"
import {t} from "../i18n/i18n"
import {Field} from "../data/Field"
import {Rules} from "../data/Rules"

export class TicketFormStore {

  public static readonly Name: string = "ticketFormStore"

  @observable applicationId = new Field([Rules.required, Rules.integer])
  @observable comment = new Field([Rules.maxLength(300)])

  constructor(private appStore: AppStore,
              private ticketService: TicketService) {
  }

  @action setApplicationId = (value: string) =>
    this.applicationId = Field.update(this.applicationId, value)

  @action setComment = (value: string) =>
    this.comment = Field.update(this.comment, value)

  @action reset = () =>
    Field.resetAll(this.applicationId, this.comment)

  @computed get invalid(): boolean {
    return !Field.haveErrors(this.applicationId, this.comment)
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
    applicationId: parseInt(this.applicationId.value),
    langCode: this.appStore.langCode,
    comment: this.comment.value
  }) as TicketRequest

}