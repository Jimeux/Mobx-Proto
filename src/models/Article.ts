import {autoserialize} from "cerialize"

export class Article {
  @autoserialize readonly id: number
  @autoserialize readonly applicationId: number
  @autoserialize readonly title: string
  @autoserialize readonly langCode: string
  @autoserialize readonly publishedFlg: boolean

  constructor(id: number, applicationId: number, title: string,
              langCode: string, publishedFlg: boolean) {
    this.id = id
    this.applicationId = applicationId
    this.title = title
    this.langCode = langCode
    this.publishedFlg = publishedFlg
  }

}