
abstract class BaseService {

  static endpoint = "http://localhost:3000"

  private basePath: string

  constructor(basePath: string) {
    this.basePath = `${BaseService.endpoint}/${basePath}`
  }

  async getRequest(path: string): Promise<any> {
    const response = await fetch(`${this.basePath}/${path}`)

    if (response.ok) {
      return response.json()
    } else {
      console.error(response)
      return null
    }
  }

}

export default BaseService