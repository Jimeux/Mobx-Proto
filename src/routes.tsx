import * as React from "react"
import {Route, IndexRoute, Redirect} from "react-router"
import {TicketList} from "./components/TicketList"
import {LoginForm} from "./components/LoginForm"
import {ArticleForm} from "./components/ArticleForm"
import {NotFound} from "./components/NotFound"
import {MainLayout} from "./components/MainLayout"
import {UserRole} from "./models/User"
import {AppStore} from "./stores/AppStore"

export const routes = (appStore: AppStore) => {

  const authorise = (role: UserRole) => {
    return (nextState: Object, replace: Function) => {
      if (appStore.isAuthenticated() && appStore.notAuthorizedFor(role))
        replace(appStore.homePath)
      else if (appStore.notAuthorizedFor(role))
        replace("/login")
    }
  }

  const redirectHome = (nextState: Object, replace: Function) => {
    if (appStore.isAuthorizedFor(UserRole.Writer))
      replace(appStore.homePath)
  }

  return (
    <Route component={MainLayout}>

      <Redirect from="/writer" to="/writer/tickets" />
      <Route path="/writer" onEnter={authorise(UserRole.Writer)}>
        <Route path="tickets" component={TicketList}/>
        <Route path="articles/create" component={ArticleForm} onEnter={authorise(UserRole.Writer)}/>
      </Route>

      <Route path="/editor" onEnter={authorise(UserRole.Editor)}>
        <IndexRoute component={ArticleForm}/>
      </Route>

      <Route path="/login" component={LoginForm} onEnter={redirectHome}/>
      <Route path="/" onEnter={redirectHome}/>
      <Route path="*" component={NotFound}/>

    </Route>
  )

}