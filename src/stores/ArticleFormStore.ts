import {observable, action, computed, asStructure} from "mobx"
import {Deserialize} from "cerialize"
import {t} from "../i18n/i18n"
import {ArticleService} from "../services/ArticleService"
import {Submittable, Field} from "../data/Field"
import {AppStore} from "./AppStore"
import {Article, ArticleWithContents, Value, Content} from "../models/Article"
import {Rules} from "../data/Rules"

export interface ContentValueField extends Value, Field {}

export class ArticleFormStore {

  public static readonly Name: string = "articleFormStore"

  private article: Article
  private contents: Array<Content> = []

  @observable fields: Array<ContentValueField> = []

  constructor(private appStore: AppStore,
              private articleService: ArticleService) {
    //super()
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
/*
    const contentIndex = this.contents.findIndex(c => c.content.id === contentId)
    const content = this.contents[contentIndex]

    const valueIndex = content.values.findIndex(v => v.id === valueId)
    const contentValue = content.values[valueIndex]

    content.values[valueIndex] = Object.assign({}, contentValue, {value})
    this.contents[contentIndex] = content
*/
  }

  @action receiveArticle = (articleWithContents: ArticleWithContents) => {
    this.article = articleWithContents.article

    this.contents = articleWithContents.contents
      .map(contentWithValues => contentWithValues.content)

    this.fields = articleWithContents.contents
      .map(contentWithValues => contentWithValues.values)
      .map(value => Field.create("shit", [Rules.required, Rules.minLength(10)], value) as ContentValueField)
  }
}

export interface ContentValueField extends Field {
  contentValue: Value
  type: string
}