import * as React from "react"
import * as Transition from "react-addons-css-transition-group"
import {Component} from "react"
import {t} from "../../i18n/i18n"

interface SnackBarProps {
  notice: string | null,
  clearNotice: Function,
}

export class Snackbar extends Component<SnackBarProps, {}> {
  render() {
    const {notice, clearNotice} = this.props

    return (
      <Transition transitionName="snackbar"
                               transitionEnterTimeout={500}
                               transitionLeaveTimeout={300}>
        {notice ? <Bar notice={notice} clearNotice={clearNotice}/> : null}
      </Transition>
    )
  }
}

const Bar = ({notice, clearNotice}) =>
  <div className="snackbar" key="snackbar-key">
    <div>
      {notice}
      <a onClick={clearNotice}>
        {t("snackbar.dismiss")}
      </a>
    </div>
  </div>