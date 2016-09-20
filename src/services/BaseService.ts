export abstract class BaseService {

  private static readonly Endpoint = "http://localhost:3000"
  protected abstract readonly BasePath: string

  protected async getRequest(path: string): Promise<any> {
    const response = await fetch(this.getUrl(path))

    if (response.ok) {
      return response.json()
    } else {
      console.error(response)
      return null
    }
  }

  getUrl = (path: string): string =>
    `${BaseService.Endpoint}/${this.BasePath}/${path}`

}
