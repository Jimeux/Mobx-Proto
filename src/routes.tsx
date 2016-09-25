import * as React from "react"
import {Route, IndexRoute, IndexRedirect} from "react-router"
import {LoginForm} from "./components/common/LoginForm"
import {WriteArticleForm} from "./components/writer/WriteArticleForm"
import {TicketListWriter} from "./components/writer/TicketListWriter"
import {NotFound} from "./components/common/NotFound"
import {MainLayout} from "./components/MainLayout"
import {UserRole} from "./models/User"
import {AppStore} from "./stores/AppStore"
import {TicketForm} from "./components/editor/TicketForm"
import {TicketListEditor} from "./components/editor/TicketListEditor"
import {ViewArticleForm} from "./components/editor/ViewArticleForm"

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
        <Route path="tickets" component={TicketListWriter}/>
        <Route path="articles/create/:id" component={WriteArticleForm}/>
      </Route>

      <Route path="/editor" onEnter={authorise(UserRole.Editor)}>
        <IndexRedirect to="tickets/create" />
        <Route path="tickets/create" component={TicketForm}/>
        <Route path="tickets" component={TicketListEditor}/>
        <Route path="articles/view/:id" component={ViewArticleForm}/>
      </Route>

      <Route path="/login" component={LoginForm} onEnter={redirectHome}/>
      <Route path="/" onEnter={redirectHome}/>
      <Route path="*" component={NotFound}/>

    </Route>
  )

}