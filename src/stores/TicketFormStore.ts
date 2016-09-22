import {observable, action, computed} from "mobx"
import {AppStore} from "./AppStore"
import {TicketService} from "../services/TicketService"
import {TicketRequest} from "../models/Ticket"
import {t} from "../i18n/i18n"

class Rules {

  static integer(value: string | null) {
    return (value == null || isNaN(parseInt(value))) ? t("error.integer") : null
  }

  static required(value: string | null) {
    return (value == null || value.length <= 0) ? t("error.required") : null
  }

  static minLength(min: number) {
    return (s: string | null) => (s == null || s.length < min) ? t("error.min_length", {min}) : null
  }

  static maxLength(max: number) {
    return (s: string | null) => (s == null || s.length > max) ? t("error.max_length", {max}) : null
  }

}

class Field {

  constructor(public rules: Array<(s: string) => any>,
              public value: string = "",
              public error: string | null = null) {
  }

  static reset(field: Field): void {
    Object.assign(field, {value: ""})
  }

  static resetAll(...fields: Field[]): void {
    fields.forEach(Field.reset)
  }

  static hasError(field: Field): boolean {
    return field.rules
        .map(validate => validate(field.value))
        .filter(result => result != null)
        .length > 0
  }

  static haveErrors(...fields: Field[]): boolean {
    return fields
        .map(Field.hasError)
        .indexOf(true) < 0
  }

  static update(field: Field, value: string): Field {
    const error = field.rules
        .map(validate => validate(value))
        .filter(result => result != null)
        .shift() || null

    return Object.assign({}, field, {value, error}) as Field
  }
}

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