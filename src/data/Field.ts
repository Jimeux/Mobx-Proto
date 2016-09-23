import {ObservableMap, extendObservable, action, computed, observable} from "mobx"

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
    const dude = fields
        .values()
        .map(Field.hasError)

    console.log(dude)
    return dude.indexOf(true) >= 0
  }

  static resetAll(fields: ObservableMap<Field>) {
    fields.forEach(field => field.reset())
  }

  static create = (rules, initialValue: string = ""): Field => {
    let field = {
      rules,
      value: "",
      error: null
    }

    extendObservable(field, {
        value: initialValue,

        update: action(((value: string) => {
          const error = field.rules
              .map(validate => validate(value))
              .filter(result => result != null)
              .shift() || null

          field = Object.assign(field, {value, error})
        })),

        reset: action(() => {
          field.value = initialValue
          field.error = null
        })
      }
    )
    return field as Field
  }
}

export abstract class Submittable {

  @observable loading = false
  @observable private initialised = false

  fields: ObservableMap<Field>

  @action update = (field: string, value: string) => {
    this.initialised = true
    this.fields.get(field).update(value)
  }

  @action setLoading = (loading: boolean) =>
    this.loading = loading

  @action reset = () => {
    this.initialised = false
    Field.resetAll(this.fields)
  }

  @computed get invalid(): boolean {
    return Field.hasErrors(this.fields)
  }

  @computed get disabled(): boolean {
    return !this.initialised || this.invalid || this.loading
  }

}