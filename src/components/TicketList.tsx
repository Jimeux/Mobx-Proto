import * as React from "react"
import * as Transition from "react-addons-css-transition-group"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../i18n/i18n"
import {TicketStore} from "../stores/TicketStore"

interface TicketListProps {
  ticketStore: TicketStore
}

@observer([TicketStore.Name])
export class TicketList extends Component<TicketListProps, {}> {
  render() {
    const {initialised, loading, getTickets, page, pageUp, pageDown} = this.props.ticketStore
    const tickets = getTickets().map(ticket =>
      <TicketRow key={`ticket-${ticket.id}`} ticket={ticket}/>)

    const actionMenu =
      <div className="action-menu">
        <div className="sections">
          <span className="active">Nominated</span>
          <span>Open</span>
        </div>
        <div className="actions">
          <i className="material-icons">search</i>
          <i className="material-icons">filter_list</i>
          <i className="material-icons">refresh</i>
        </div>
      </div>

    const ticketList =
      <div>
        {initialised && loading ? <div className="loader-bar"></div> : null}
        {actionMenu}

        <div className="ticket-table-wrapper">
          <div className="ticket-table">
            <table>
              <TicketHeader/>
              <tbody>{tickets}</tbody>
              <TicketFooter pageUp={pageUp} pageDown={pageDown} page={page}/>
            </table>
          </div>
        </div>
      </div>

    return (
      <div>
        {!initialised ? <Loader /> : null}
        <Transition transitionName="ticket-list"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
          {tickets.length > 0 ? ticketList : null}
        </Transition>
      </div>
    )
  }
}

const TicketHeader = () =>
  <thead>
  <tr>
    <th>
      <span className="sort-icon">
        <i className="material-icons">arrow_upward</i>
      </span>
      <span className="name">Name</span>
    </th>
    <th>App Title</th>
    <th>Name</th>
    <th>Item Type</th>
    <th>Article Unit Price</th>
    <th>First Draft Due</th>
    <th>Article Type</th>
    <th>Grade Range</th>
    <th>Status</th>
  </tr>
  </thead>

const TicketRow = ({ticket}) =>
  <tr>
    <td>{ticket.name}</td>
    <td>{ticket.appTitle}</td>
    <td>{ticket.name}</td>
    <td>{ticket.itemType}</td>
    <td>{ticket.articleUnitPrice}</td>
    <td>{ticket.firstDraftDue}</td>
    <td>{ticket.articleType}</td>
    <td>{ticket.gradeRange}</td>
    <td>{ticket.status}</td>
  </tr>

const TicketFooter = ({page, pageUp, pageDown}) =>
  <tfoot>
  <tr>
    <td colSpan={9}>
      <span className="page-icon" onClick={pageUp}>
        <i className="material-icons">chevron_right</i>
      </span>
      <span className="page-icon" onClick={pageDown}>
        <i className="material-icons">chevron_left</i>
      </span>
      <span className="count-info">{page * 10 - 10 + 1}-{page * 10} of 100</span>
    </td>
  </tr>
  </tfoot>

const Loader = () =>
  <div className="loader">
    <div className="img-wrapper">
      <img src="/public/images/loader.svg"/>
    </div>
  </div>
