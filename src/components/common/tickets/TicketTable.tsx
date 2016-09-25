import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {Loader} from "../Loader"
import {Ticket} from "../../../models/Ticket"
import {TicketFooter} from "./TicketFooter"
import {TicketHeader} from "./TicketHeader"
import {TicketRow} from "./TicketRow"

interface TicketListProps {
  loading: boolean
  tickets: Array<Ticket>
  fetchTickets: () => void
  clickRow: (id: number) => void
  page: number
  pageUp: () => void
  pageDown: () => void
  size: number
}

@observer
export class TicketTable extends Component<TicketListProps, {}> {

  componentDidMount() {
    this.props.fetchTickets()
  }

  render() {
    return (this.props.loading && this.props.tickets.length === 0) ?
      <Loader /> : this.renderTicketList()
  }

  renderTicketRows = (tickets) => {
    return tickets.map(ticket =>
      <TicketRow key={`ticket-${ticket.id}`}
                 ticket={ticket}
                 onClick={() => this.props.clickRow(ticket.id)}/>)
  }

  renderTicketList = () => {
    const {tickets, loading, page, pageUp, pageDown, size} = this.props

    return (
      <div>
        {tickets.length > 0 && loading ?
          <div className="progress"><div className="indeterminate"></div></div> : null}

        {this.renderActionMenu()}

        <div className="ticket-table-wrapper">
          <div className="ticket-table">
            <table>
              <TicketHeader/>
              <tbody>{this.renderTicketRows(tickets)}</tbody>
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
        <i className="material-icons" onClick={this.props.fetchTickets}>
          refresh
        </i>
      </div>
    </div>
}