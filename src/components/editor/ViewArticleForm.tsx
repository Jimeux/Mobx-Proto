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
export class ViewArticleForm extends Component<ArticleFormProps, {}> {
  render() {
    const {fetchArticle, disabled, loading, save, finish, fields} = this.props.articleFormStore
    const getArticle = () => fetchArticle(parseInt(this.props.params["id"]))

    return (
      <ArticleForm getArticle={getArticle} loading={loading} save={save} readOnly={true} fields={fields}>
        <ArticleForm.Actions>
          <i className="material-icons">message</i>
          <i className="material-icons">report_problem</i>
          <i className="material-icons">publish</i>
        </ArticleForm.Actions>
        <ArticleForm.Submit>
          <button disabled={disabled} onClick={finish}>
            {t("article.publish.submit")}
          </button>
        </ArticleForm.Submit>
      </ArticleForm>
    )
  }
}