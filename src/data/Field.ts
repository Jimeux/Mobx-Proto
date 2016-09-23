import {ObservableMap, extendObservable, action, computed} from "mobx"

export interface Field {
  rules: Array<(s: string) => string | null>
  value: string
  error: string | null
  update: (s: string) => void
  reset: () => void
}

export class Field {

  static hasError(field: Field): boolean {
    return field.rules
        .map(validate => validate(field.value))
        .filter(result => result != null)
        .length > 0
  }

  static hasErrors(fields: ObservableMap<Field>): boolean {
    return fields
        .values()
        .map(Field.hasError)
        .indexOf(true) < 0
  }

  static resetAll(fields: ObservableMap<Field>) {
    fields.forEach(field => field.reset())
  }

  static create = (rules, value: string = ""): Field => {
    const field = {
      rules,
      value: "",
      error: null
    }

    extendObservable(field, {
        value: value,

        update: action(((val: string) => {
          field.value = val
          field.error = field.rules
              .map(validate => validate(val))
              .filter(result => result != null)
              .shift() || null
        })),

        reset: action(() => {
          field.value = value
          field.error = null
        })
      }
    )
    return field as Field
  }
}

export class Submittable {
  fields: ObservableMap<Field>

  update = (field: string, value: string) =>
    this.fields.get(field).update(value)

  @action reset = () => Field.resetAll(this.fields)

  @computed get invalid(): boolean {
    return !Field.hasErrors(this.fields)
  }
}