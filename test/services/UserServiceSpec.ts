import {expect} from "chai"
import * as fetchMock from "fetch-mock"
import UserService from "../../src/services/UserService"
import factory from "../support/factory"

describe("UserService", () => {

  it("get", async () => {
    const userJson = factory.user
    fetchMock.get("*", userJson)

    const userService = new UserService()
    const user = await userService.get(1)

    expect(user.name).to.equal(userJson.name)
    expect(user.id).to.equal(userJson.id)
    expect(user.avatar).to.equal(userJson.avatar)
  })

})