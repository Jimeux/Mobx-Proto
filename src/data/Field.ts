export class Field {

  constructor(public rules: Array<(s: string) => string | null>,
              public value: string = "",
              public error: string | null = null) {
  }

  static reset(field: Field): void {
    Object.assign(field, {value: ""})
  }

  static resetAll(...fields: Field[]): void {
    fields.forEach(Field.reset)
  }

  static hasError(field: Field): boolean {
    return field.rules
        .map(validate => validate(field.value))
        .filter(result => result != null)
        .length > 0
  }

  static haveErrors(...fields: Field[]): boolean {
    return fields
        .map(Field.hasError)
        .indexOf(true) < 0
  }

  static update(field: Field, value: string): Field {
    const error = field.rules
        .map(validate => validate(value))
        .filter(result => result != null)
        .shift() || null

    return Object.assign({}, field, {value, error}) as Field
  }
}