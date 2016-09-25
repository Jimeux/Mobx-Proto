import * as React from "react"
import {Component} from "react"
import {ObservableMap} from "mobx"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {Field} from "../../data/Field"
import {TextField, TextAreaField} from "../common/form/Fields"
import {Loader} from "./Loader"

interface ArticleFormProps {
  readonly loading: boolean,
  readonly save: Function,
  readonly getArticle: Function,
  readonly readOnly: boolean,
  readonly fields: ObservableMap<Field>
}

interface ArticleFormState {
  stickyClass: string
}

const Actions = (props) =>
  <div className="actions">
    {props.children}
  </div>

const Submit = (props) =>
  <section>
    <div className="submit">
      {props.children}
    </div>
  </section>

@observer
export class ArticleForm extends Component<ArticleFormProps, ArticleFormState> {

  static Actions = Actions
  static Submit = Submit

  constructor(props) {
    super(props)
    this.state = {stickyClass: ""}
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    window.addEventListener("scroll", this.handleScroll)
    this.props.getArticle()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    this.setState({stickyClass: (window.pageYOffset >= 90) ? "sticky" : ""})
  }

  render() {
    const {loading, save, readOnly, fields} = this.props
    const actions = getChild(this.props, Actions)
    const submit = getChild(this.props, Submit)

    return (
      <div className={`article-form ${this.state.stickyClass}`}>
        <div className="body-wrapper">
          {this.renderActionMenu(actions)}
          {loading || fields.size <= 0 ? <Loader/> : this.renderForm(fields, readOnly, save, submit)}
        </div>
      </div>
    )
  }

  renderActionMenu = (actions) =>
    <div className={`action-menu ${this.state.stickyClass}`}>
      <div className="breadcrumbs">
        <span className="active">Some ticket title</span>
        <span className="separator"><i className="material-icons">chevron_right</i></span>
        <span>{t("article.write.write_article")}</span>
      </div>
      {actions}
    </div>

  renderForm = (fields, readOnly, save, submit) =>
    <div className="body">
      <section>
        <span className="heading">{t("article.write.intro_article")}</span>
        <TextAreaField field={fields.get("text")} readOnly={readOnly} onBlur={save} hideLabel={true}/>
      </section>

      <section>
        <span className="heading">{t("article.write.points")}</span>
        <TextField field={fields.get("points_1")} readOnly={readOnly} onBlur={save} hideLabel={true}/>
        <TextField field={fields.get("points_2")} readOnly={readOnly} onBlur={save} hideLabel={true}/>
        <TextField field={fields.get("points_3")} readOnly={readOnly} onBlur={save} hideLabel={true}/>
      </section>

      {submit}
    </div>
}

function getChild(props, type) {
  return React.Children
    .toArray(props.children)
    .find((child: any) => child.type === type)
}