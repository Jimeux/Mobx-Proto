import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TicketFormStore} from "../../stores/TicketFormStore"

interface TicketFormProps {
  readonly ticketFormStore: TicketFormStore
}

@observer([TicketFormStore.Name])
export class TicketForm extends Component<TicketFormProps, {}> {
  render() {
    const {applicationId, setApplicationId, comment, setComment, createTicket, invalid} = this.props.ticketFormStore

    return (
      <SleekForm title={t("ticket.create.title")}
                 submit={t("ticket.create.submit")}
                 onSubmit={createTicket}
                 disabled={invalid}>
        <div>
          <div className={`text-field ${applicationId.error ? "error" : ""}`}>
            <label>{t("ticket.create.applicationId")} {applicationId.error}</label>
            <input type="number"
                   value={applicationId.value}
                   onChange={(e) => setApplicationId((e.target as HTMLInputElement).value)}/>
          </div>
          <div className={`text-field ${comment.error ? "error" : ""}`}>
            <label>{t("ticket.create.comment")} {comment.error}</label>
            <textarea rows={3}
                      value={comment.value}
                      onChange={(e) => setComment((e.target as HTMLInputElement).value)}/>
          </div>
        </div>
      </SleekForm>
    )
  }
}

export const SleekForm = (props) =>
  <div className="login-form">
    <div className="header">
      <span>{props.title}</span>
    </div>
    <div className="body">
      {props.children}
      <div className="submit">
        <button onClick={props.onSubmit} disabled={props.disabled}>
          {props.submit}
        </button>
      </div>
    </div>
  </div>