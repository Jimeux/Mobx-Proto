export abstract class BaseService {

  private static readonly Endpoint = "/api"

  protected abstract readonly BasePath: string

  protected async getRequest(path: string): Promise<any> {
    try {
      return await fetch(this.getUrl(path))
    } catch (e) {
      console.log(e)
      return null
    }
  }

  protected async postRequest(path: string, data: any): Promise<Response | null> {
    try {
      return await fetch(this.getUrl(path), {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: data
      })
    } catch (e) {
      console.log(e)
      return null
    }
  }

  private getUrl(path: string): string {
    return `${BaseService.Endpoint}/${this.BasePath}${path === "/" ? "" : "/" + path}`
  }

}
