declare var require: (moduleId: string) => any
const casual = require("casual")

casual.define("user", () => ({
  id: casual.integer(10000, 99999),
  department: casual.company_name,
  name: casual.first_name,
  namae: casual.first_name,
  avatar: casual.url
}))

casual.define("ticket", () => ({
  id: casual.integer(1000, 2000),
  appTitle: casual.title,
  name: casual.title,
  itemType: casual.words(2),
  articleUnitPrice: casual.double(0, 100),
  firstDraftDue: casual.date("YYYY/MM/DD"),
  articleType: `${casual.integer(100, 999)} ${casual.letter}${casual.letter}${casual.letter}`,
  gradeRange: "A",
  status: casual.words(2)
}))

export {casual as default}
                                               ``