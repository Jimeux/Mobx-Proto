import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TicketStore} from "../../stores/TicketStore"
import {AppStore} from "../../stores/AppStore"
import {Loader} from "../../components/common/Loader"
import {TicketStatus} from "../../models/Ticket"
import {TicketFooter} from "../common/tickets/TicketFooter"
import {TicketHeader} from "../common/tickets/TicketHeader"
import {TicketRow} from "../common/tickets/TicketRow"

interface TicketListProps {
  readonly appStore: AppStore
  readonly ticketStore: TicketStore
}

@observer([TicketStore.Name, AppStore.Name])
export class TicketListWriter extends Component<TicketListProps, {}> {

  componentDidMount() {
    this.props.ticketStore.fetchTickets(TicketStatus.Writing)
  }

  render() {
    const {initialised, currentTickets} = this.props.ticketStore
    const tickets = currentTickets.map(ticket =>
      <TicketRow key={`ticket-${ticket.id}`}
                 ticket={ticket}
                 onClick={() => this.props.appStore.setPath(`/writer/articles/create/${ticket.id}`)}/>)

    return (
      <div>
        {!initialised ? <Loader /> : null}
        {tickets.length > 0 ? this.renderTicketList(tickets) : null}
      </div>
    )
  }

  renderTicketList = (tickets) => {
    const {initialised, loading, page, pageUp, pageDown, size} = this.props.ticketStore

    return (
      <div>
        {initialised && loading ? <div className="loader-bar"></div> : null}
        {this.renderActionMenu()}

        <div className="ticket-table-wrapper">
          <div className="ticket-table">
            <table>
              <TicketHeader/>
              <tbody>{tickets}</tbody>
              <TicketFooter pageUp={pageUp} pageDown={pageDown} page={page} count={size}/>
            </table>
          </div>
        </div>
      </div>
    )
  }

  renderActionMenu = () =>
    <div className="action-menu">
      <div className="sections">
        <span className="active">Nominated</span>
        <span>Open</span>
      </div>
      <div className="actions">
        <i className="material-icons">search</i>
        <i className="material-icons">filter_list</i>
        <i className="material-icons" onClick={() => this.props.ticketStore.fetchTickets(TicketStatus.Writing)}>
          refresh
        </i>
      </div>
    </div>
}