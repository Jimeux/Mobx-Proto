import {expect} from "chai"
import factory from "../support/factory"
import {Mock} from "typemoq"
import UserStore from "../../src/stores/TicketStore"
import UserService from "../../src/services/TicketService"
import User from "../../src/models/Ticket"
import AppStore from "../../src/stores/AppStore"

describe("TicketStore", () => {

  let mockAppStore: Mock<AppStore>
  let mockUserService: Mock<UserService>
  let userStore: UserStore

  beforeEach(() => {
    mockAppStore = Mock.ofType(AppStore)
    mockUserService = Mock.ofType(UserService)
    userStore = new UserStore(mockAppStore.object, mockUserService.object)
  })

  describe("get", () => {

    it("returns a User instance on success", async() => {
      const user = User.create(factory.user)
      mockUserService.setup(_ => _.get(user.id))
        .returns(() => Promise.resolve(user))

      await userStore.fetchUser(user.id)
      expect(userStore.user).to.equal(user)
    })

  })

  describe("index", () => {

    it("returns an array of Users on success", async() => {
      const users = [factory.user, factory.user, factory.user].map(User.create)
      mockUserService.setup(_ => _.index(1))
        .returns(() => Promise.resolve(users))

      await userStore.fetchTickets(1)
      //http://stackoverflow.com/questions/35929369/mobx-observable-array-does-not-display-correctly
      expect(userStore.tickets.slice()).to.eql(users)
    })

  })

})