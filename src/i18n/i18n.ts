declare var require: (moduleId: string) => any
const i18next = require("i18next")
const LanguageDetector = require("i18next-browser-languagedetector")

export const I18N_LANGUAGE = "I18N_LANGUAGE"

//TODO: These will live in separate files
const en = {
  "translation": {
    "nav": {
      "brand": "Appliv Cloud",
      "message": "You're logged in as {{name}}"
    },

    "login": {
      "username": "Username",
      "password": "Password",
      "submit": "Login",
      "error": "Invalid username or password"
    },

    "users": {
      "error": "Unable to retrieve users.",
      "title": "Users"
    },

    "site": {
      "not_found": "Nicht Gefounden"
    },

    "error": {
      "too_short": "should be at least {{min}} characters long",
      "too_long": "should be no more than {{max}} characters long",
      "alpha_num": "can contain only letters, numbers and - or _"
    }
  }
}

const ja = {
  "translation": {
    "nav": {
      "brand": "アプリヴクラウド",
      "message": "{{name}}としてログインしています"
    },

    "login": {
      "username": "ユーザー名",
      "password": "パスワード",
      "submit": "ログイン",
      "error": "ユーザー名またはパスワードが間違っています"
    },

    "users": {
      "error": "ユーザーを取得できませんでした。",
      "title": "ユーザー一覧"
    },

    "site": {
      "not_found": "ニクト・ゲファウンデン"
    },

    "error": {
      "too_short": "は{{min}}以上の値にしてください",
      "too_long": "は{{max}}以下の値にしてください",
      "alpha_num": "は半角英数字文字または-_のみを入力してください"
    }
  }
}

i18next
  .use(LanguageDetector)
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      "en": en,
      "ja": ja
    },
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: I18N_LANGUAGE,
      caches: ["localStorage"]
    }
  })

export const t: Function = i18next.t.bind(i18next)

export default i18next