import * as React from "react"
import * as Transition from "react-addons-css-transition-group"
import {Component} from "react"
import {observer} from "mobx-react"
import {AppStore} from "../stores/AppStore"
import {Menu} from "../components/Menu"
import {Navbar} from "../components/Navbar"
import {Snackbar} from "./common/SnackBar"
import {SessionStore} from "../stores/SessionStore"

interface MainLayoutProps {
  readonly appStore: AppStore
  readonly sessionStore: SessionStore
}

@observer([AppStore.Name, SessionStore.Name])
export class MainLayout extends Component<MainLayoutProps, {}> {
  render() {
    const {appStore, sessionStore} = this.props
    const {locale, notice, clearNotice} = this.props.appStore
    const {menuIsOpen, closeMenu, currentUser} = this.props.appStore

    return (
      <div className="main-layout" key={locale}>
        <Menu menuIsOpen={menuIsOpen} closeMenu={closeMenu}/>

        <Transition transitionName="navbar" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {currentUser ? <Navbar appStore={appStore} sessionStore={sessionStore}/> : null}
        </Transition>

        <main>{this.props.children}</main>
        <Snackbar notice={notice} clearNotice={clearNotice}/>
      </div>
    )
  }
}