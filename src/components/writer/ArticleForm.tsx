import * as React from "react"
import {Component} from "react"
import {Router} from "react-router"
import {observer} from "mobx-react"
import {t} from "../../i18n/i18n"
import {ArticleFormStore} from "../../stores/ArticleFormStore"
import {ContentWithValues} from "../../models/Article"

interface ArticleFormProps {
  readonly articleFormStore: ArticleFormStore
  readonly params: Router.Params
}

interface ArticleFormState {
  sticky: boolean
}

@observer([ArticleFormStore.Name])
export class ArticleForm extends Component<ArticleFormProps, ArticleFormState> {

  constructor(props: ArticleFormProps) {
    super(props)
    this.state = {sticky: false}
    const articleId = parseInt(props.params["id"])
    this.props.articleFormStore.fetchArticle(articleId)
  }

  handleScroll = () =>
    this.setState({sticky: window.pageYOffset >= 90})

  componentDidMount = () =>
    window.addEventListener("scroll", this.handleScroll)

  componentWillUnmount = () =>
    window.removeEventListener("scroll", this.handleScroll)

  render() {
    return (
      <div className={`article-form ${this.state.sticky ? "sticky" : ""}`}>
        <div className="body-wrapper">
          {this.renderActionMenu()}
          {this.renderForm()}
          {this.renderContents()}
        </div>
      </div>
    )
  }

  getFormProps = () => {
  }

  renderContents = () => {
    const store = this.props.articleFormStore
    if (store.fields.length <= 0)
      return null

    const [field, ...rest] = store.fields

    return <Text value={field.value}
                 error={field.error}
                 onChange={field.update}/>
  }

  renderActionMenu = () =>
    <div className={`action-menu ${this.state.sticky ? "sticky" : ""}`}>
      <div className="breadcrumbs">
        <span className="active">Some ticket title</span>
        <span className="separator"><i className="material-icons">chevron_right</i></span>
        <span>Write article</span>
      </div>
      <div className="actions">
        <i className="material-icons">timer</i>
        <i className="material-icons">undo</i>
        <i className="material-icons">save</i>
      </div>
    </div>

  renderForm = () =>
    <div className="body">
      <section>
        <span className="heading">Introductory Article</span>

        <TextField type="text"
                   label="Title"
                   error={""}
                   onChange={(e) => {}}/>

        <TextAreaField label="Review"
                       error={""}
                       rows={5}
                       onChange={() => {}}/>

      </section>

      <section>
        <span className="heading">Recommended Points</span>
        <TextField type="text"
                   label="Point 1"
                   error={""}
                   onChange={(e) => {}}/>
        <TextField type="text"
                   label="Point 2"
                   error={""}
                   onChange={(e) => {}}/>
        <TextField type="text"
                   label="Point 3"
                   error={""}
                   onChange={(e) => {}}/>
      </section>

      <section>
        <div className="submit">
          <button>
            Submit
          </button>
        </div>
      </section>
    </div>

}

const Text = ({value, error, onChange}) =>
  <div className={`text-field ${error ? "error" : ""}`}>
    <label>Text {error}</label>
    <textarea value={value.value} rows={5} onChange={onChange}/>
  </div>

const TextField = ({type, label, error, onChange}) =>
  <div className={`text-field ${error ? "error" : ""}`}>
    <label>{label}{error}</label>
    <input type={type} onChange={onChange}/>
  </div>

const TextAreaField = ({label, error, onChange, rows = 4}) =>
  <div className={`textarea-field ${error ? "error" : ""}`}>
    <label>{label}{error}</label>
    <textarea onChange={onChange} rows={rows}/>
  </div>