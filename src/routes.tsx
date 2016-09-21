import * as React from "react"
import {Route, IndexRoute, IndexRedirect} from "react-router"
import {TicketList} from "./components/writer/TicketList"
import {LoginForm} from "./components/common/LoginForm"
import {ArticleForm} from "./components/ArticleForm"
import {NotFound} from "./components/common/NotFound"
import {MainLayout} from "./components/MainLayout"
import {UserRole} from "./models/User"
import {AppStore} from "./stores/AppStore"
import {TicketForm} from "./components/editor/TicketForm"

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
    if (appStore.isAuthenticated())
      replace(appStore.homePath)
  }

  return (
    <Route component={MainLayout}>

      <Route path="/writer" onEnter={authorise(UserRole.Writer)}>
        <IndexRedirect to="tickets" />
        <Route path="tickets" component={TicketList}/>
        <Route path="articles/create/:id" component={ArticleForm} onEnter={authorise(UserRole.Writer)}/>
      </Route>

      <Route path="/editor" onEnter={authorise(UserRole.Editor)}>
        <IndexRoute component={TicketForm}/>
      </Route>

      <Route path="/login" component={LoginForm} onEnter={redirectHome}/>
      <Route path="/" onEnter={redirectHome}/>
      <Route path="*" component={NotFound}/>

    </Route>
  )

}