import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {Field} from "../../../data/Field"

interface TextFieldProps {
  field: Field
}

@observer
export class TextField extends Component<TextFieldProps, {}> {
  render() {
    const field = this.props.field
    return (
      <div className={`text-field ${field.error ? "error" : ""}`}>
        <label>{field.label}{field.error}</label>
        <input type="text" onChange={field.update} value={field.value}/>
      </div>
    )
  }
}
