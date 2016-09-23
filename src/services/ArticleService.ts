import {BaseService} from "./BaseService"
import {Article, Value, Content, ContentWithValues, ArticleWithContents} from "../models/Article"
import {Deserialize} from "cerialize"
import e = require("express")

export class ArticleService extends BaseService {

  protected readonly BasePath: string = "articles"

  async get(id: number): Promise<ArticleWithContents> {
    const response = await this.getRequest(`/${id}`)
    const articleJson = await response.json()
    const article: Article = Deserialize(articleJson.article, Article)
    const contents: Array<ContentWithValues> = articleJson.contents.map(contentWithValues => ({
      content: Deserialize(contentWithValues.content, Content),
      values: <Array<Value>>contentWithValues.values.map(value => Deserialize(value, Value))
    }))
    return {article, contents} as ArticleWithContents
  }

}