import * as React from "react"
import {Dropdown, MenuItem} from "react-bootstrap"

export const UserMenu = ({currentUser, locale, switchLocale, logout}) =>
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