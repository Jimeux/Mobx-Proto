import * as React from "react"
import * as Transition from "react-addons-css-transition-group"
import {Component} from "react"

interface MenuProps {
  menuIsOpen: boolean
  closeMenu: Function
}

export default class Menu extends Component<MenuProps, {}> {
  render() {
    const {menuIsOpen, closeMenu} = this.props

    return (
      <Transition transitionName="menu"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
        {menuIsOpen ? <Content closeMenu={closeMenu}/> : null}
      </Transition>
    )
  }
}

const Content = ({closeMenu}) =>
  <div className="menu-container" onClick={closeMenu}>
    <div className="menu" onClick={(e) => e.stopPropagation()}>
      <div className="heading">
        A<small>ppliv</small> C<small>loud</small>
      </div>
      <div className="body">
        <span className="user">Logged in as James</span>
        <ul>
          <li>My Issues</li>
          <li>Log out</li>
        </ul>
      </div>
    </div>
  </div>