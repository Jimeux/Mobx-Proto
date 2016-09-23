import {t} from "../i18n/i18n"

export class Rules {

  static integer(s: string | null) {
    return (s == null || isNaN(parseInt(s))) ? t("error.integer") : null
  }

  static required(s: string | null) {
    return (s == null || s.length <= 0) ? t("error.required") : null
  }

  static alphaNum(s: string) {
    return !(!!s.match(/^[_\-\w]+$/)) ? t("error.alpha_num") : null
  }

  static minLength(min: number) {
    return (s: string | null) => (s == null || s.length < min) ? t("error.min_length", {min}) : null
  }

  static maxLength(max: number) {
    return (s: string | null) => (s == null || s.length > max) ? t("error.max_length", {max}) : null
  }

}