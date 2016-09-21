import * as React from "react"
import {Component} from "react"
import {Router} from "react-router"
import {observer} from "mobx-react"
import {SessionStore} from "../stores/SessionStore"
import {t} from "../i18n/i18n"
import {ArticleStore} from "../stores/ArticleStore"

interface ArticleFormProps {
  readonly articleStore: ArticleStore
  readonly sessionStore: SessionStore
  readonly params: Router.Params
}

interface ArticleFormState {
  sticky: boolean
}

@observer([SessionStore.Name, ArticleStore.Name])
export class ArticleForm extends Component<ArticleFormProps, ArticleFormState> {

  constructor(props: ArticleFormProps) {
    super(props)
    this.state = {sticky: false}
    const articleId = parseInt(props.params["id"])
    props.articleStore.fetchArticle(articleId)
  }

  handleScroll = () => this.setState({sticky: window.pageYOffset >= 50})

  componentDidMount = () => window.addEventListener("scroll", this.handleScroll)

  componentWillUnmount = () => window.removeEventListener("scroll", this.handleScroll)

  render() {
    const store = this.props.sessionStore
    const stickyClass = this.state.sticky ? "sticky" : ""

    const actionMenu =
      <div className={`action-menu ${stickyClass}`}>
        <div className="breadcrumbs">
          <span className="active">Some ticket title</span>
          <span className="separator"><i className="material-icons">chevron_right</i></span>
          <span>Write article</span>
        </div>
        <div className="actions">
          <i className="material-icons">timer</i>
          <i className="material-icons">mode_edit</i>
          <i className="material-icons">save</i>
        </div>
      </div>

    return (
      <div className={`article-form ${stickyClass}`}>
        {actionMenu}
        <div className="body-wrapper">
          <div className="body">
            <section>
              <span className="heading">Introductory Article</span>

              <TextField type="text"
                         label="Title"
                         error={store.errorFor("username")}
                         onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>

              <TextAreaField label="Review"
                             error={store.errorFor("password")}
                             rows={10}
                             onChange={(e) => store.setPassword((e.target as HTMLInputElement).value)}/>

            </section>

            <section>
              <span className="heading">Recommended Points</span>
              <TextField type="text"
                         label="Point 1"
                         error={store.errorFor("username")}
                         onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>
              <TextField type="text"
                         label="Point 2"
                         error={store.errorFor("username")}
                         onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>
              <TextField type="text"
                         label="Point 3"
                         error={store.errorFor("username")}
                         onChange={(e) => store.setUsername((e.target as HTMLInputElement).value)}/>
            </section>

            <section>
              <div className="submit">
                <button onClick={() => store.login()} disabled={!store.isValid()}>
                  Submit
                </button>
              </div>
            </section>
          </div>
        </div>

        <aside>
          <section>
            <h3>Ticket Info</h3>
          </section>
          <section>
            <h3>Process</h3>
          </section>
        </aside>

      </div>
    )
  }
}

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