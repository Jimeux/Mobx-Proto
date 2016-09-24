import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TicketStore} from "../../stores/TicketStore"
import {AppStore} from "../../stores/AppStore"
import {Loader} from "../../components/common/Loader"

interface TicketListProps {
  readonly appStore: AppStore
  readonly ticketStore: TicketStore
}

@observer([TicketStore.Name, AppStore.Name])
export class TicketList extends Component<TicketListProps, {}> {

  componentDidMount() {
    this.props.ticketStore.fetchTickets()
  }

  render() {
    const {initialised, loading, currentTickets, page, pageUp, pageDown, size} = this.props.ticketStore
    const tickets = currentTickets.map(ticket =>
      <TicketRow key={`ticket-${ticket.id}`}
                 ticket={ticket}
                 onClick={() => this.props.appStore.setPath(`/writer/articles/create/${ticket.id}`)} />)

    const actionMenu =
      <div className="action-menu">
        <div className="sections">
          <span className="active">Nominated</span>
          <span>Open</span>
        </div>
        <div className="actions">
          <i className="material-icons">search</i>
          <i className="material-icons">filter_list</i>
          <i className="material-icons" onClick={this.props.ticketStore.fetchTickets}>refresh</i>
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
              <TicketFooter pageUp={pageUp} pageDown={pageDown} page={page} count={size}/>
            </table>
          </div>
        </div>
      </div>

    return (
      <div>
        {!initialised ? <Loader /> : null}
        {tickets.length > 0 ? ticketList : null}
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
      <span className="name">{t("ticket.index.id")}</span>
    </th>
    <th>{t("ticket.index.app_id")}</th>
    <th>{t("ticket.index.article_id")}</th>
    <th>{t("ticket.index.status")}</th>
    <th>{t("ticket.index.comment")}</th>
  </tr>
  </thead>

const TicketRow = ({ticket, onClick}) =>
  <tr onClick={onClick}>
    <td>{ticket.id}</td>
    <td>{ticket.applicationId}</td>
    <td>{ticket.articleId}</td>
    <td>{ticket.status}</td>
    <td>{ticket.comment}</td>
  </tr>

const TicketFooter = ({page, pageUp, pageDown, count}) =>
  <tfoot>
  <tr>
    <td colSpan={5}>
      <span className="page-icon" onClick={pageUp}>
        <i className="material-icons">chevron_right</i>
      </span>
      <span className="page-icon" onClick={pageDown}>
        <i className="material-icons">chevron_left</i>
      </span>
      <span className="count-info">
        {t("ticket.index.page_info", {
          from: (page * 10 - 10 + 1),
          to: (page * 10 >= count ? count : page * 10),
          count
        })}
      </span>
    </td>
  </tr>
  </tfoot>
