import {expect} from "chai"
import * as React from "react"
import {shallow} from "enzyme"
import NotFound from "../../src/components/NotFound"

describe("NotFound", () => {

  it("displays a helpful message", () => {
    const notFound = shallow(<NotFound/>)
    expect(notFound.text()).to.eq('Nicht Gefounden')
  })

})