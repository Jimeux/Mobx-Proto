import {expect} from "chai"
import factory from "../support/factory"
import User from "../../src/models/Ticket"

describe("User", () => {

  describe("create", () => {

    it("returns a User instance with valid JSON", () => {
      const userJson = factory.user
      const user = User.create(userJson)

      expect(user.id).to.equal(userJson.id)
      expect(user.email).to.equal(userJson.email)
      expect(user.title).to.equal(userJson.title)
      expect(user.namae).to.equal(userJson.namae)
      expect(user.avatar).to.equal(userJson.avatar)
      expect(user.department).to.equal(userJson.department)
    })

  })

})