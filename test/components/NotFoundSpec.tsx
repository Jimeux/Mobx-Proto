import * as React from "react"
import {expect} from "chai"
import {shallow} from "enzyme"
import {t} from "../../src/i18n/i18n"
import NotFound from "../../src/components/common/NotFound"

describe("NotFound", () => {

  it("displays a helpful message", () => {
    const notFound = shallow(<NotFound/>)
    expect(notFound).text().to.equal(t("site.not_found"))
  })

})