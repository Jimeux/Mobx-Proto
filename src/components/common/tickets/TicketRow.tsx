import * as React from "react"

export const TicketRow = ({ticket, onClick}) =>
  <tr onClick={onClick}>
    <td>{ticket.id}</td>
    <td>{ticket.applicationId}</td>
    <td>{ticket.articleId}</td>
    <td>{ticket.status}</td>
    <td>{ticket.comment}</td>
  </tr>