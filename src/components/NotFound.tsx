import * as React from "react"
import {Component} from "react"
import {t} from "../i18n/i18n"

export default class NotFound extends Component<{}, {}> {
  render() {
    return (
      <div>{t("site.not_found")}</div>
    )
  }
}