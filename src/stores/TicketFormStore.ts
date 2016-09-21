import {observable, action, asMap} from "mobx"
import {AppStore} from "./AppStore"
import {TicketService} from "../services/TicketService"
import {Ticket} from "../models/Ticket"
import {t} from "../i18n/i18n"

class Rules {
  static required<T>(value: T): boolean {
    return value != null
  }

  static nonEmpty(value: string | null): boolean {
    return value != null && value.length > 0
  }

  static minLength(min: number): (s: string | null) => boolean {
    return (s: string | null) => s != null && s.length >= min
  }

  static maxLength(max: number): (s: string | null) => boolean {
    return (s: string | null) => s != null && s.length <= max
  }
}

interface FormField<T> {
  value: T
  rules: Array<(t: T) => any>
  error: string | null
}

export class TicketFormStore {

  public static readonly Name: string = "ticketFormStore"

  @observable applicationId: FormField<number | null> = {
    value: null,
    rules: [Rules.required],
    error: null
  }

  @observable comment: FormField<string | null> = {
    value: null,
    rules: [Rules.required, Rules.maxLength(20)],
    error: null
  }

  private appStore: AppStore
  private ticketService: TicketService

  constructor(appStore: AppStore, ticketService: TicketService) {
    this.appStore = appStore
    this.ticketService = ticketService
  }

  @action setApplicationId = (value: string) =>
    this.applicationId = this.updateField(this.applicationId, parseInt(value))

  @action setComment = (value: string) =>
    this.comment = this.updateField(this.comment, value)

  updateField<T>(field: FormField<T>, value: T): FormField<T> {
    const errors = field.rules.map(f => f(value)).filter(b => !b)
    const error = (errors.length > 0) ? "has an error" : null
    return Object.assign({}, field, {value, error})
  }

  createTicket = async(): Promise<void> => {
    console.log("Create ticket")
  }

}