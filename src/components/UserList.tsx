import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {t} from "../i18n/i18n"
import UserStore from "../stores/UserStore"
import User from "../models/User"

interface UserListProps {
  userStore: UserStore,
}

@observer(["userStore"])
export default class UserList extends Component<UserListProps, {}> {

  render() {
    return (
      <div>
        <h4>{t("users.title")}</h4>
        {this.props.userStore.getUsers().map(this.renderUser)}
      </div>
    )
  }

  renderUser = (user: User) =>
    <UserItem key={`user-${user.id}`}
              user={user}
              active={this.props.userStore.isSelectedUser(user.id)}
              onClick={() => this.props.userStore.fetchUser(user.id)}/>

}

const UserItem = ({user, onClick, active}) =>
  <div onClick={onClick}>
    <span>{user.name}</span>
    {active ? <span>&nbsp;{user.department}</span> : null}
  </div>