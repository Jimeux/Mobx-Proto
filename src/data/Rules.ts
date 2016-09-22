import {t} from "../i18n/i18n"

export class Rules {

  static integer(value: string | null) {
    return (value == null || isNaN(parseInt(value))) ? t("error.integer") : null
  }

  static required(value: string | null) {
    return (value == null || value.length <= 0) ? t("error.required") : null
  }

  static minLength(min: number) {
    return (s: string | null) => (s == null || s.length < min) ? t("error.min_length", {min}) : null
  }

  static maxLength(max: number) {
    return (s: string | null) => (s == null || s.length > max) ? t("error.max_length", {max}) : null
  }

}