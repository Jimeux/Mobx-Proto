import * as React from "react"
import {t} from "../../../i18n/i18n"

export const TicketFooter = ({page, pageUp, pageDown, count}) =>
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
