import {ObservableMap, extendObservable, action, computed, observable} from "mobx"

export interface Field {
  label: string
  rules: Array<(s: string) => string | null>
  value: string
  error: string | null
  update: () => void
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
        .indexOf(true) >= 0
  }

  static resetAll(fields: ObservableMap<Field>) {
    fields.forEach(field => field.reset())
  }

  static create = <T extends Field>(label: string,
                                    rules: Array<(s: string) => string | null>,
                                    base: any = {},
                                    initialValue: string = ""): T => {
    const field = {
      label,
      rules,
      value: "",
      error: null
    }

    let obj = Object.assign(field, base)

    extendObservable(obj, {
        value: initialValue,

        update: action(((e: Event) => {
          const value = (e.target as HTMLInputElement).value
          const error = obj.rules
              .map(validate => validate(value))
              .filter(result => result != null)
              .shift() || null

          obj = Object.assign(obj, {value, error})
          return false
        })),

        reset: action(() => {
          obj.value = initialValue
          obj.error = null
        })
      }
    )

    return obj as T
  }
}

export abstract class Submittable<T extends Field> {

  @observable loading = false
  //@observable private initialised = false

  fields: ObservableMap<T>

  @action setLoading = (loading: boolean) =>
    this.loading = loading

  @action reset = () => {
    //this.initialised = false
    Field.resetAll(this.fields)
  }

  @computed get invalid(): boolean {
    return Field.hasErrors(this.fields)
  }

  @computed get disabled(): boolean {
    //return !this.initialised || this.invalid || this.loading
    return this.invalid || this.loading
  }

}