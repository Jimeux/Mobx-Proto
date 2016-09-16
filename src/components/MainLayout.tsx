import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {Link} from "react-router"
import {t} from "../i18n/i18n"
import AppStore from "../stores/AppStore"

interface MainLayoutProps {
  appStore: AppStore
}

@observer([AppStore.Name])
export default class MainLayout extends Component<MainLayoutProps, {}> {
  render() {
    const {currentUser, locale, switchLocale, error} = this.props.appStore
    return (
      <div className="main-layout" key={locale}>
        <Navbar user={currentUser} locale={locale} switchLocale={switchLocale}/>
        {error ? <ErrorNotice error={error}/> : null}
        <main>{this.props.children}</main>
      </div>
    )
  }
}

const ErrorNotice = ({error}) =>
  <div>{error}</div>

const Brand = () =>
  <div className="brand">
    <Link to="/">{t("nav.brand")}</Link>
  </div>

const LoginMenu = ({currentUser, locale, switchLocale}) =>
  <div className="login-menu">
    {currentUser ? t("nav.message", {name: currentUser.name}) : null}&nbsp;
    <button onClick={() => switchLocale()}>{locale}</button>
  </div>

const Navbar = (props) =>
  <nav>
    <Brand/>
    <LoginMenu {...props}/>
  </nav>