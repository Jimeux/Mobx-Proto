import {BaseService} from "./BaseService"

export class ArticleService extends BaseService {

  constructor() {
    super("articles")
  }

  get = async(id: number) => {}

  index = async(page: number) => {}

}