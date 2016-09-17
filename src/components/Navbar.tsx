import * as React from "react"
import {Component} from "react"
import {Link} from "react-router"
import {t} from "../i18n/i18n"
import AppStore from "../stores/AppStore"

interface NavbarProps {
  appStore: AppStore
}

export default class Navbar extends Component<NavbarProps, {}> {
  render() {
    const {currentUser, switchLocale, locale, openMenu} = this.props.appStore

    return (
      <nav>
        <Brand openMenu={openMenu} currentUser={currentUser}/>
        <LoginMenu currentUser={currentUser} switchLocale={switchLocale} locale={locale}/>
      </nav>
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

const LoginMenu = ({currentUser, locale, switchLocale}) =>
  <div className="login-menu">
    <button onClick={() => switchLocale()}>{locale}</button>
  </div>