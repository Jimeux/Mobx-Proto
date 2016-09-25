import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TicketFormStore} from "../../stores/TicketFormStore"
import {Loader} from "../common/Loader"
import {TextField, TextAreaField} from "../common/form/Fields"
import {BoxForm} from "../common/form/BoxForm"

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
    <BoxForm title={<span>{t("ticket.create.title")}</span>}
             submit={t("ticket.create.submit")}
             onSubmit={createTicket}
             disabled={disabled}>

      <TextField field={fields.get("applicationId")}/>
      <TextAreaField field={fields.get("comment")}/>

    </BoxForm>

}