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

  render() {
    const {loading, createTicket, disabled, fields} = this.props.ticketFormStore
    return loading ? <Loader /> : this.renderForm(createTicket, disabled, fields)
  }

  renderForm = (createTicket, disabled, fields) =>
    <BoxForm title={t("ticket.create.title")}
             submit={t("ticket.create.submit")}
             onSubmit={createTicket}
             disabled={disabled}>

      {fields.map((field, i) => <TextField key={i} field={field}/>)}

    </BoxForm>

}