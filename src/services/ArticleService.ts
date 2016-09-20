import {BaseService} from "./BaseService"

export class ArticleService extends BaseService {

  protected readonly BasePath: string = "articles"

  get = async(id: number) => {}

  index = async(page: number) => {}

}