import * as React from "react"
import {Link} from "react-router"
import * as Transition from "react-addons-css-transition-group"
import {Component} from "react"
import {User, UserRole} from "../models/User"

interface MenuProps {
  menuIsOpen: boolean
  closeMenu: Function
  currentUser: User
}

export class Menu extends Component<MenuProps, {}> {
  render() {
    const {menuIsOpen, closeMenu, currentUser} = this.props

    return (
      <Transition transitionName="menu"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
        {menuIsOpen ? <Content closeMenu={closeMenu} role={currentUser.role}/> : null}
      </Transition>
    )
  }
}

const Content = ({closeMenu, role}) =>
  <div className="menu-container" onClick={closeMenu}>
    <div className="menu" onClick={(e) => e.stopPropagation()}>
      <div className="heading">
        A<small>ppliv</small> C<small>loud</small>
      </div>
      <div className="body">
        <span className="user">Logged in as James</span>
        <ul>
          <li><Link to="/writer">Writers</Link></li>
          {role >= UserRole.Editor ? <li><Link to="/editor">Editors</Link></li> : null}
        </ul>
      </div>
    </div>
  </div>