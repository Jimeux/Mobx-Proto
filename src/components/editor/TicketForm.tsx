import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TicketFormStore} from "../../stores/TicketFormStore"
import {BoxForm} from "../common/SleekForm"
import {Loader} from "../common/Loader"

interface TicketFormProps {
  readonly ticketFormStore: TicketFormStore
}

@observer([TicketFormStore.Name])
export class TicketForm extends Component<TicketFormProps, {}> {

  private store: TicketFormStore = this.props.ticketFormStore

  render() {
    return this.store.loading ? <Loader /> : this.renderForm(this.formProps)
  }

  get formProps() {
    const {fields, update, createTicket, disabled} = this.store
    const applicationId = fields.get("applicationId")
    const comment = fields.get("comment")
    return {createTicket, disabled, applicationId, comment, update}
  }

  renderForm = (props) =>
    <BoxForm title={t("ticket.create.title")}
             submit={t("ticket.create.submit")}
             onSubmit={props.createTicket}
             disabled={props.disabled}>

      <div className={`text-field ${props.applicationId.error ? "error" : ""}`}>
        <label>{t("ticket.create.applicationId")}{props.applicationId.error}</label>
        <input type="number"
               value={props.applicationId.value}
               onChange={(e) => props.update("applicationId", (e.target as HTMLInputElement).value)}/>
      </div>

      <div className={`text-field ${props.comment.error ? "error" : ""}`}>
        <label>{t("ticket.create.comment")}{props.comment.error}</label>
        <textarea rows={3}
                  value={props.comment.value}
                  onChange={(e) => props.update("comment", (e.target as HTMLInputElement).value)}/>
      </div>
    </BoxForm>

}