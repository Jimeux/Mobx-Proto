import * as React from "react"
import {Component} from "react"
import {Router} from "react-router"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {TextField} from "../../components/common/form/TextField"
import {ArticleFormStore} from "../../stores/ArticleFormStore"
import {Loader} from "../common/Loader"

interface ArticleFormProps {
  readonly articleFormStore: ArticleFormStore
  readonly params: Router.Params
}

interface ArticleFormState {
  sticky: boolean
}

@observer([ArticleFormStore.Name])
export class ArticleForm extends Component<ArticleFormProps, ArticleFormState> {

  private store = this.props.articleFormStore

  componentDidMount() {
    const articleId = parseInt(this.props.params["id"])
    this.props.articleFormStore.fetchArticle(articleId)
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => this.store.setScrollPosition(window.pageYOffset)

  render() {
    const {fields, loading, disabled, save, finish, stickyClass} = this.store

    return (
      <div className={`article-form ${stickyClass}`}>
        <div className="body-wrapper">
          {this.renderActionMenu(stickyClass)}
          {loading || fields.size <= 0 ? "Loading" : this.renderForm(fields, disabled, save, finish)}
        </div>
      </div>
    )
  }

  renderActionMenu = (stickyClass) =>
    <div className={`action-menu ${stickyClass}`}>
      <div className="breadcrumbs">
        <span className="active">Some ticket title</span>
        <span className="separator"><i className="material-icons">chevron_right</i></span>
        <span>{t("article.write.write_article")}</span>
      </div>
      <div className="actions">
        <i className="material-icons">timer</i>
        <i className="material-icons">undo</i>
        <i className="material-icons">save</i>
      </div>
    </div>

  renderForm = (fields, disabled, save, finish) =>
    <div className="body">
      <section>
        <span className="heading">{t("article.write.intro_article")}</span>
        {this.renderField(fields.get("text"), save)}
      </section>

      <section>
        <span className="heading">{t("article.write.points")}</span>
        {this.renderField(fields.get("points_1"), save)}
        {this.renderField(fields.get("points_2"), save)}
        {this.renderField(fields.get("points_3"), save)}
      </section>

      <section>
        <div className="submit">
          <button disabled={disabled} onClick={finish}>
            {t("article.write.submit")}
          </button>
        </div>
      </section>
    </div>

  renderField = (field, save) =>
    <div className={`text-field ${field.error ? "error" : ""}`}>
      <label>{/*{field.label}*/}{field.error}&nbsp;</label>
      <input type="text" onChange={field.update} value={field.value} onBlur={() => save(field)}/>
    </div>
}