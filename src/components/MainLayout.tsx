import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {AppStore} from "../stores/AppStore"
import {Menu} from "../components/Menu"
import {Navbar} from "../components/Navbar"
import {Snackbar} from "./common/SnackBar"
import {LoginFormStore} from "../stores/LoginFormStore"

interface MainLayoutProps {
  readonly appStore: AppStore
  readonly loginFormStore: LoginFormStore
}

@observer([AppStore.Name, LoginFormStore.Name])
export class MainLayout extends Component<MainLayoutProps, {}> {
  render() {
    const {appStore, loginFormStore} = this.props
    const {locale, notice, clearNotice} = this.props.appStore
    const {menuIsOpen, closeMenu, currentUser} = this.props.appStore

    return (
      <div className="main-layout" key={locale}>
        <Menu menuIsOpen={menuIsOpen} closeMenu={closeMenu}/>
        {currentUser ? <Navbar appStore={appStore} loginFormStore={loginFormStore}/> : null}
        <main>{this.props.children}</main>
        <Snackbar notice={notice} clearNotice={clearNotice}/>
      </div>
    )
  }
}