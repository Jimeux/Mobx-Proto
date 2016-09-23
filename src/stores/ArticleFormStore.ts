import {observable, action, computed, asStructure} from "mobx"
import {Deserialize} from "cerialize"
import {t} from "../i18n/i18n"
import {ArticleService} from "../services/ArticleService"
import {Submittable, Field} from "../data/Field"
import {AppStore} from "./AppStore"
import {Article, ArticleWithContents, Value, ContentWithValues} from "../models/Article"

export class ArticleFormStore extends Submittable {

  public static readonly Name: string = "articleFormStore"

  @observable article: Article
  @observable contents: Array<ContentWithValues> = []

  constructor(private appStore: AppStore,
              private articleService: ArticleService) {
    super()
  }

  fetchArticle = async(id: number): Promise<void> => {
    try {
      const article = await this.articleService.get(id)

      if (article == null) {
        //this.appStore.notify("Article is null")
      } else
        this.receiveArticle(article)
    } catch (error) {
      //this.appStore.notify(error.toString())
    }
  }

  @action updateContent = (contentId: number, valueId: number, value: string) => {
    const contentIndex = this.contents.findIndex(c => c.content.id === contentId)
    const content = this.contents[contentIndex]

    const valueIndex = content.values.findIndex(v => v.id === valueId)
    const contentValue = content.values[valueIndex]

    content.values[valueIndex] = Object.assign({}, contentValue, {value})
    this.contents[contentIndex] = content
  }

  @action receiveArticle = (articleWithContents: ArticleWithContents) => {
    //this.appStore.notify(`Fetched article with ID ${articleWithContents.contents}`)
    this.article = articleWithContents.article

    articleWithContents.contents.forEach(aws => this.contents.push(aws))
  }
}

export interface ContentValueField extends Field {
  contentValue: Value
  type: string
}