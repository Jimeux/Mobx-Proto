import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import AppStore from "../stores/AppStore"
import Menu from "../components/Menu"
import Navbar from "../components/Navbar"
import Snackbar from "../components/Snackbar"

interface MainLayoutProps {
  appStore: AppStore
}

@observer([AppStore.Name])
export default class MainLayout extends Component<MainLayoutProps, {}> {
  render() {
    const {locale, notice, clearNotice} = this.props.appStore
    const {menuIsOpen, closeMenu, currentUser} = this.props.appStore

    return (
      <div className="main-layout" key={locale}>
        <Menu menuIsOpen={menuIsOpen} closeMenu={closeMenu}/>
        {currentUser ? <Navbar appStore={this.props.appStore}/> : null}
        <main>{this.props.children}</main>
        <Snackbar notice={notice} clearNotice={clearNotice}/>
      </div>
    )
  }
}