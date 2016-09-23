import {observable, action, computed} from "mobx"
import {Deserialize} from "cerialize"
import {t} from "../i18n/i18n"
import {ArticleService} from "../services/ArticleService"
import {Submittable} from "../data/Field"
import {AppStore} from "./AppStore"
import {Article, ArticleWithContents, Value} from "../models/Article"

export class ArticleFormStore extends Submittable {

  public static readonly Name: string = "articleFormStore"

  constructor(private appStore: AppStore,
              private articleService: ArticleService) {
    super()
  }

  fetchArticle = async(id: number): Promise<void> => {
    if (this.loading)
      return
    try {
      this.setLoading(true)
      const article = await this.articleService.get(id)

      if (article == null)
        this.appStore.notify("Article is null")
      else
        this.receiveArticle(article)
    } catch (error) {
      this.appStore.notify(error.toString())
    }
  }

  @action receiveArticle = (response: ArticleWithContents) => {
      this.appStore.notify(`Fetched article with ID ${response.contents}`)
  }

}