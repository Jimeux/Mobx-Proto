import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TicketFormStore} from "../../stores/TicketFormStore"
import {BoxForm} from "../common/SleekForm"

interface TicketFormProps {
  readonly ticketFormStore: TicketFormStore
}

@observer([TicketFormStore.Name])
export class TicketForm extends Component<TicketFormProps, {}> {
  render() {
    const {fields, update, createTicket, invalid} = this.props.ticketFormStore
    const applicationId = fields.get("applicationId")
    const comment = fields.get("comment")

    return (
      <BoxForm title={t("ticket.create.title")}
               submit={t("ticket.create.submit")}
               onSubmit={createTicket}
               disabled={invalid}>

        <div className={`text-field ${applicationId.error ? "error" : ""}`}>
          <label>{t("ticket.create.applicationId")}{applicationId.error}</label>
          <input type="number"
                 value={applicationId.value}
                 onChange={(e) => update("applicationId", (e.target as HTMLInputElement).value)}/>
        </div>

        <div className={`text-field ${comment.error ? "error" : ""}`}>
          <label>{t("ticket.create.comment")}{comment.error}</label>
          <textarea rows={3}
                    value={comment.value}
                    onChange={(e) => update("comment", (e.target as HTMLInputElement).value)}/>
        </div>

      </BoxForm>
    )
  }
}