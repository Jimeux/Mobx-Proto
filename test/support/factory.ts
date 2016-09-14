declare var require: (moduleId: string) => any
const casual = require("casual")

casual.define("user", () => ({
  id: casual.integer(10000, 99999),
  department: casual.company_name,
  name: casual.first_name,
  namae: casual.first_name,
  avatar: casual.url
}))

export {casual as default}
                                               ``