import * as React from "react"
import {t} from "../../../i18n/i18n"

export const TicketHeader = () =>
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