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
    const {applicationId, comment, setApplicationId, setComment} = this.props.ticketFormStore

    return (
      <SleekForm title="Create Ticket" submit="Create">
        <div>
          <div className={`text-field ${applicationId.error ? "error" : ""}`}>
            <label>Application ID {applicationId.error}</label>
            <input type="text" onChange={(e) => setApplicationId((e.target as HTMLInputElement).value)}/>
          </div>
          <div className={`text-field ${comment.error ? "error" : ""}`}>
            <label>Comment {comment.error}</label>
            <textarea rows={3} onChange={(e) => setComment((e.target as HTMLInputElement).value)}/>
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
        <button onClick={() => {}}>
          {props.submit}
        </button>
      </div>
    </div>
  </div>