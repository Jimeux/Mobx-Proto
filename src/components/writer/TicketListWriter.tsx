import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {TicketStore} from "../../stores/TicketStore"
import {AppStore} from "../../stores/AppStore"
import {TicketStatus} from "../../models/Ticket"
import {TicketTable} from "../common/tickets/TicketTable"

interface TicketListProps {
  readonly appStore: AppStore
  readonly ticketStore: TicketStore
}

@observer([TicketStore.Name, AppStore.Name])
export class TicketListWriter extends Component<TicketListProps, {}> {

  getTicketTableProps(props) {
    const {loading, page, pageUp, pageDown, size, currentTickets} = props.ticketStore
    const clickRow = (id) => props.appStore.setPath(`/writer/articles/create/${id}`)
    const fetchTickets = () => props.ticketStore.fetchTickets(TicketStatus.Writing)
    return {
      tickets: currentTickets, loading, page, pageUp, pageDown, size, clickRow, fetchTickets
    }
  }

  render() {
    return <TicketTable {...this.getTicketTableProps(this.props)}/>
  }

}