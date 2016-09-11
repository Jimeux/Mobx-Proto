import * as React from 'react'
import {Component} from "react"
import {observer} from "mobx-react"
import {Link} from "react-router"
import AppStore from "../stores/AppStore"

interface MainLayoutProps {
  appStore: AppStore
}

@observer(["appStore"])
export default class MainLayout extends Component<MainLayoutProps, {}> {

  render() {
    const {currentUser, locale, setLocale, error} = this.props.appStore

    return (
      <div className="main-layout">
        <Navbar user={currentUser} locale={locale} setLocale={setLocale}/>
        {(error === null) ? null : <ErrorNotice error={error}/>}
        <main>{this.props.children}</main>
      </div>
    )
  }

}

const ErrorNotice = ({error}) =>
  <div>{error}</div>

const Brand = () =>
  <div className="brand">
    <Link to="/">Appliv Cloud</Link>
  </div>

const LoginMenu = ({user, locale, setLocale}) =>
  <div className="login-menu">
    {locale === "en" ?
      `You're logged in as ${user.name}` :
      `${user.name}としてログインしています`}&nbsp;
    <button onClick={() => setLocale("ja")}>{locale}</button>
  </div>

const Navbar = (props) =>
  <nav>
    <Brand/>
    <LoginMenu {...props}/>
  </nav>