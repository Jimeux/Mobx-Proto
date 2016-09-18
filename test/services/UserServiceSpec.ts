import {expect} from "chai"
import * as fetchMock from "fetch-mock"
import UserService from "../../src/services/TicketService"
import factory from "../support/factory"

describe("TicketService", () => {

  afterEach(() => {
    fetchMock.restore()
  })

  describe("get", () => {

    it("returns a User instance on success", async() => {
      const userJson = factory.user
      fetchMock.mock("*", userJson)

      const userService = new UserService()
      const user = await userService.get(1)

      expect(user.id).to.equal(userJson.id)
    })

  })

})