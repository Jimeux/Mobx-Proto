import * as React from "react"
import {Component} from "react"
import {Link} from "react-router"
import {t} from "../i18n/i18n"
import {AppStore} from "../stores/AppStore"
import {SessionStore} from "../stores/SessionStore"
import {UserMenu} from "./common/UserMenu"

interface NavbarProps {
  readonly appStore: AppStore
  readonly sessionStore: SessionStore
}

export class Navbar extends Component<NavbarProps, {}> {
  render() {
    const {currentUser, switchLocale, locale, openMenu} = this.props.appStore
    const {logout} = this.props.sessionStore

    return (
      <div>
        <nav>
          <div className="nav-title-bar">
            <Brand openMenu={openMenu} currentUser={currentUser}/>
            <div className="nav-tabs">
              <Link activeClassName="" to="/">Home</Link>
              <Link activeClassName="active" to="/writer/tickets">Tickets</Link>
            </div>
            <UserMenu currentUser={currentUser} switchLocale={switchLocale} locale={locale} logout={logout}/>
          </div>
        </nav>
      </div>
    )
  }
}

const Brand = ({openMenu, currentUser}) =>
  <div className="brand">
    {!currentUser ? null :
      <a className="menu-icon" onClick={openMenu}>
        <i className="material-icons">menu</i>
      </a>}
    <Link className="brand-text" to="/">{t("nav.brand")}</Link>
  </div>

