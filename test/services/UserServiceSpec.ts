import {expect} from "chai"
import UserService from "../../src/services/UserService"

describe("UserService", () => {

  it("compiles tests", async () => {
    const userJson = {
      "id": 16,
      "avatar": "https://placehold.it/28x28",
      "department": "Development",
      "name": "Jim",
      "namae": "ジム"
    }
    const userService = new UserService((i) => userJson)
    const result = await userService.get(1)
    expect(result).to.not.be.null
  })

})