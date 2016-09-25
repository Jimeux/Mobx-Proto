import * as React from "react"
import {Component} from "react"
import {Router} from "react-router"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {ArticleFormStore} from "../../stores/ArticleFormStore"
import {ArticleForm} from "../common/ArticleForm"

interface ArticleFormProps {
  readonly articleFormStore: ArticleFormStore
  readonly params: Router.Params
}

@observer([ArticleFormStore.Name])
export class WriteArticleForm extends Component<ArticleFormProps, {}> {
  render() {
    const {fetchArticle, disabled, loading, save, finish, fields} = this.props.articleFormStore
    const getArticle = () => fetchArticle(parseInt(this.props.params["id"]))

    return (
      <ArticleForm getArticle={getArticle} loading={loading} save={save} readOnly={false} fields={fields}>
        <ArticleForm.Actions>
          <i className="material-icons">timer</i>
          <i className="material-icons">undo</i>
          <i className="material-icons">save</i>
        </ArticleForm.Actions>
        <ArticleForm.Submit>
          <button disabled={disabled} onClick={finish}>
            {t("article.write.submit")}
          </button>
        </ArticleForm.Submit>
      </ArticleForm>
    )
  }
}