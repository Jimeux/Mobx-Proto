
export default class BaseService {

  static endpoint = "http://localhost:3000"

  private fetch
  private basePath: String

  constructor(fetch: Object, basePath: String) {
    this.fetch = fetch
    this.basePath = `${BaseService.endpoint}/${basePath}`
  }

  async getRequest(path: String): Promise<any> {
    const response = await fetch(`${this.basePath}/${path}`)

    if (response.ok) {
      return response.json()
    } else {
      console.error(response)
      return null
    }
  }

}