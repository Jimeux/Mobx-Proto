import BaseService from "./BaseService"
import Ticket from "../models/Ticket"

export default class ArticleService extends BaseService {

  constructor() {
    super("articles")
  }

  get = async(id: number) => {}

  index = async(page: number) => {}

}