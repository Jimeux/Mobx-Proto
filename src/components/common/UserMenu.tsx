import * as React from "react"
import {Dropdown, MenuItem} from "react-bootstrap"
import {t} from "../../i18n/i18n"

export const UserMenu = ({currentUser, locale, switchLocale, logout}) =>
  <div className="login-menu">
    <Dropdown id="dropdown-custom-1" pullRight>
      <Dropdown.Toggle noCaret>
        <img
          src="//lh3.googleusercontent.com/-CRrGcWGA0gU/AAAAAAAAAAI/AAAAAAAAAAA/APaXHhTPz7a0Fy55gFF2oyg1z5FBn9Oh1Q/s64-c-mo/photo.jpg"/>
      </Dropdown.Toggle>
      <Dropdown.Menu className="super-colors">
        <MenuItem eventKey="1">{t("nav.user_menu.settings")}</MenuItem>
        <MenuItem divider/>
        <MenuItem eventKey="2" onClick={logout}>{t("nav.user_menu.log_out")}</MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  </div>