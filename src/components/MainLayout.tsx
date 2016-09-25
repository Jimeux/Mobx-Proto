import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {Link} from "react-router"
import {AppStore} from "../stores/AppStore"
import {Menu} from "../components/Menu"
import {Navbar} from "../components/Navbar"
import {Snackbar} from "./common/SnackBar"
import {LoginFormStore} from "../stores/LoginFormStore"
import {UserRole} from "../models/User"
import {t} from "../i18n/i18n"

interface MainLayoutProps {
  readonly appStore: AppStore
  readonly loginFormStore: LoginFormStore
  readonly location: Location
}

@observer([AppStore.Name, LoginFormStore.Name])
export class MainLayout extends Component<MainLayoutProps, {}> {
  render() {
    const {appStore, loginFormStore, location} = this.props
    const {locale, notice, clearNotice} = this.props.appStore
    const {menuIsOpen, closeMenu, currentUser} = this.props.appStore

    return (
      <div className="main-layout" key={locale}>
        {(currentUser == null) ? null : <Menu currentUser={currentUser} menuIsOpen={menuIsOpen} closeMenu={closeMenu}/>}
        {(currentUser == null) ? null : this.renderNavbar(location.pathname, currentUser, appStore, loginFormStore)}
        <main>{this.props.children}</main>
        <Snackbar notice={notice} clearNotice={clearNotice}/>
      </div>
    )
  }

  renderNavbar = (pathname: string, currentUser, appStore, loginFormStore) => {
    if (!currentUser)
      return null
    else if (pathname.includes("writer"))
      return (
        <Navbar appStore={appStore} loginFormStore={loginFormStore}>
          <Link activeClassName="active" to="/">{t("nav.tabs.writer.home")}</Link>
          <Link activeClassName="active" to="/writer/tickets">{t("nav.tabs.writer.tickets")}</Link>
        </Navbar>
      )
    else if (pathname.includes("editor"))
      return (
        <Navbar appStore={appStore} loginFormStore={loginFormStore}>
          <Link activeClassName="active" to="/editor/tickets/create">{t("nav.tabs.editor.home")}</Link>
          <Link activeClassName="active" to="/editor/tickets">{t("nav.tabs.editor.tickets")}</Link>
        </Navbar>
      )
    else
      return null
  }
}