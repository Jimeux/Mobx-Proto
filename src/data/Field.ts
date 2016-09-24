import {ObservableMap, asMap, extendObservable, action, computed, observable} from "mobx"

export interface Field {
  label: string
  rules: Array<(s: string) => string | null>
  value: string
  error: string | null
  update: () => void
  reset: () => void
  valid: () => boolean
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
    let field = Object.assign({
      label,
      rules
    }, base)

    extendObservable(field, {
        value: initialValue || base.value || "",
        error: null,
        update: action(((e: Event) => {
          const value = (e.target as HTMLInputElement).value
          const error = field.rules
              .map(validate => validate(value))
              .filter(result => result != null)
              .shift() || null

          Object.assign(field, {value, error})
        })),

        reset: action(() => {
          field.value = initialValue
          field.error = null
        }),

        valid: computed(() => !Field.hasError(field))
      }
    )

    return field as T
  }
}

export abstract class Submittable<T extends Field> {

  @observable loading = false

  @observable fields: ObservableMap<T> = asMap<T>({})

  @action setLoading = (loading: boolean) =>
    this.loading = loading

  @action reset = () =>
    Field.resetAll(this.fields)

  @computed get invalid(): boolean {
    return Field.hasErrors(this.fields)
  }

  @computed get disabled(): boolean {
    return this.fields.size < 1 || this.invalid || this.loading
  }

}