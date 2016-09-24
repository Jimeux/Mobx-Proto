import {observable, action, computed, asMap, ObservableMap} from "mobx"
import {Deserialize} from "cerialize"
import {t} from "../i18n/i18n"
import {ArticleService} from "../services/ArticleService"
import {Submittable, Field} from "../data/Field"
import {AppStore} from "./AppStore"
import {Article, ArticleWithContents, Value, Content, ContentWithValues} from "../models/Article"
import {Rules} from "../data/Rules"
import {TicketService} from "../services/TicketService"

export interface ContentValueField extends Value, Field {
}

export class ArticleFormStore extends Submittable<ContentValueField> {

  public static readonly Name: string = "articleFormStore"

  private ticketId: number
  private article: Article
  private contents: Array<Content> = []

  @observable scrollPosition: number = 0

  constructor(private appStore: AppStore,
              private ticketService: TicketService,
              private articleService: ArticleService) {
    super()
  }

  @action fetchArticle = async(id: number): Promise<void> => {
    //if (this.loading || (this.article && this.article.id === id))
    //return
    try {
      this.ticketId = id
      const article = await this.articleService.get(id)

      if (article == null) {
        this.appStore.notify("Article is null")
      } else {
        this.receiveArticle(article)
      }
    } catch (error) {
      this.appStore.notify(error.toString())
    }
  }

  save = async(field: ContentValueField) => {
    if (!field.valid)
      return

    const data = {
      contentId: field.communitiesArticlesContentId,
      key: field.key,
      value: field.value
    }
    const response = await this.articleService.updateValue(this.article.id, data)
  }

  finish = async() => {
    this.setLoading(true)
    const response = await this.ticketService.advance(this.ticketId)

    if (response == null || response.status > 400)
      this.appStore.notify(t("error.unexpected"))
    else {
      const json = await response.json()
      if (response.ok) {
        this.appStore.notify("Article progressed")
      } else {
        this.appStore.notify(JSON.stringify(json))
      }
    }
    this.setLoading(false)
  }

  @action receiveArticle = (articleWithContents: ArticleWithContents) => {
    this.article = articleWithContents.article

    this.contents = articleWithContents.contents
      .map(contentWithValues => contentWithValues.content)

    const fields = {}
    articleWithContents.contents
      .map(contentWithValues => contentWithValues.values)
      .reduce((a, b) => a.concat(b))
      .map(value => fields[value.key] = Field.create(value.key, [Rules.required, Rules.minLength(10)], value))

    this.fields.clear()
    this.fields.merge(fields)

    this.setLoading(false)
  }

  @action setScrollPosition = (offset: number) =>
    this.scrollPosition = offset

  get stickyClass() {
    return this.scrollPosition >= 90 ? "sticky" : ""
  }
}

export interface ContentValueField extends Field {
  contentValue: Value
  type: string
}