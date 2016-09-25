import * as React from "react"
import {observer} from "mobx-react"
import {Field} from "../../../data/Field"

interface FieldProps {
  field: Field
  readOnly?: boolean
  hideLabel?: boolean
  rows?: number
  onBlur?: () => void
}

export const TextField = observer(
  ({field, readOnly = false, onBlur = () => {}, hideLabel = false}: FieldProps) =>

  <div className={`text-field ${field.error ? "error" : ""}`}>
    <label>{hideLabel ? null : field.label}<span>{field.error}</span></label>
    {readOnly
      ? <input disabled={true} type="text" value={field.value}/>
      : <input type="text" onChange={field.update} value={field.value} onBlur={onBlur}/>}
  </div>
)

export const TextAreaField = observer(
  ({field, rows = 3, readOnly = false, onBlur = () => {}, hideLabel = false}: FieldProps) =>

  <div className={`text-field ${field.error ? "error" : ""}`}>
    <label>{hideLabel ? null : field.label}<span>{field.error}</span></label>
    {readOnly
      ? <textarea rows={rows} disabled={true} value={field.value}/>
      : <textarea rows={rows} onChange={field.update} value={field.value} onBlur={onBlur}/>}
  </div>
)