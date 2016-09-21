import {observable, action, computed} from "mobx"
import {Deserialize} from "cerialize"
import {i18n, t} from "../i18n/i18n"

export class ArticleStore {

  public static readonly Name: string = "articleStore"

  constructor() {
  }

  public fetchArticle(id: number) {
    console.log(`ID iz: ${id}`)
  }

}