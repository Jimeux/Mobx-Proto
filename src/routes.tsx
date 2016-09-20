import * as React from "react"
import {Route} from "react-router"
import {TicketList} from "./components/TicketList"
import {LoginForm} from "./components/LoginForm"
import {ArticleForm} from "./components/ArticleForm"
import {NotFound} from "./components/NotFound"
import {MainLayout} from "./components/MainLayout"

export const routes = (appStore) => {

  const authRequired = (nextState: Object, replace: Function) => {
    if (!appStore.isAuthenticated)
      replace("/login")
  }

  return (
    <Route component={MainLayout}>
      <Route path="/" component={TicketList} onEnter={authRequired}/>
      <Route path="/articles/create" component={ArticleForm} onEnter={authRequired}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="*" component={NotFound}/>
    </Route>
  )

}