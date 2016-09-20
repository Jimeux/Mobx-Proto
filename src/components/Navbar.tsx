import * as React from "react"
import {Component} from "react"
import {Link} from "react-router"
import {Dropdown, MenuItem} from "react-bootstrap"
import {t} from "../i18n/i18n"
import {AppStore} from "../stores/AppStore"
import {SessionStore} from "../stores/SessionStore"

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
              <Link activeClassName="active" to="/writer/articles/create">Articles</Link>
            </div>
            <LoginMenu currentUser={currentUser}
                       switchLocale={switchLocale}
                       locale={locale}
                       logout={logout}/>
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

const LoginMenu = ({currentUser, locale, switchLocale, logout}) =>
  <div className="login-menu">
    <Dropdown id="dropdown-custom-1" pullRight>
      <Dropdown.Toggle noCaret>
        <img
          src="//lh3.googleusercontent.com/-CRrGcWGA0gU/AAAAAAAAAAI/AAAAAAAAAAA/APaXHhTPz7a0Fy55gFF2oyg1z5FBn9Oh1Q/s64-c-mo/photo.jpg"/>
      </Dropdown.Toggle>
      <Dropdown.Menu className="super-colors">
        <MenuItem eventKey="1">Settings</MenuItem>
        <MenuItem divider/>
        <MenuItem eventKey="2" onClick={logout}>Log out</MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  </div>