import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TicketFormStore} from "../../stores/TicketFormStore"
import {BoxForm} from "../common/SleekForm"
import {Loader} from "../common/Loader"
import {TextField} from "../common/form/TextField"

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
    const {fields, createTicket, disabled} = this.store
    const applicationId = fields.get("applicationId")
    const comment = fields.get("comment")
    return {createTicket, disabled, applicationId, comment}
  }

  renderForm = (props) =>
    <BoxForm title={t("ticket.create.title")}
             submit={t("ticket.create.submit")}
             onSubmit={props.createTicket}
             disabled={props.disabled}>

      <TextField field={props.applicationId}/>
      <TextField field={props.comment}/>

    </BoxForm>

}