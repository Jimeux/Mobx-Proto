import {autoserialize} from "cerialize"

export interface ArticleJson extends Article {
}

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

export class Content {
  @autoserialize readonly id: number
  @autoserialize readonly communitiesArticleId: number
  @autoserialize readonly contentType: string
  @autoserialize readonly position: number

  constructor(id: number, communitiesArticleId: number,
              contentType: string, position: number) {
    this.id = id
    this.communitiesArticleId = communitiesArticleId
    this.contentType = contentType
    this.position = position
  }

}

export class Value {
  @autoserialize readonly id: number
  @autoserialize readonly communitiesArticlesContentId: number
  @autoserialize readonly key: string
  @autoserialize readonly value: string
  @autoserialize readonly position: number

  constructor(id: number, communitiesArticlesContentId: number,
              key: string, value: string, position: number) {
    this.id = id
    this.communitiesArticlesContentId = communitiesArticlesContentId
    this.key = key
    this.value = value
    this.position = position
  }

}

export interface ArticleWithContents {
  article: Article
  contents: Array<ContentWithValues>
}

export interface ContentWithValues {
  content: Content
  values: Array<Value>
}