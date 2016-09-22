declare var require: (moduleId: string) => any
const i18next = require("i18next")
const LanguageDetector = require("i18next-browser-languagedetector")

export const I18N_LANGUAGE = "I18N_LANGUAGE"

//TODO: These will live in separate files
const en = {
  "translation": {
    "nav": {
      "brand": "Appliv Cloud",
      "message": "You're logged in as {{title}}"
    },

    "login": {
      "username": "Username",
      "password": "Password",
      "submit": "LOGIN",
      "error": "Invalid username or password"
    },

    "users": {
      "error": "Unable to retrieve tickets.",
      "title": "Users"
    },

    "site": {
      "not_found": "Nicht Gefounden"
    },

    "snackbar": {
      "dismiss": "Dismiss"
    },

    "ticket": {
      "create": {
        "title": "Create Ticket",
        "submit": "Create",
        "applicationId": "Application ID",
        "comment": "Comment",
        "success": "Ticket created with ID {{id}}"
      }
    },

    "error": {
      "required": " is required",
      "min_length": " must be at least {{min}} characters long",
      "max_length": " must be no more than {{max}} characters long",
      "integer": " must be an integer",
      "alpha_num": " can contain only letters, numbers and - or _",
      "unexpected": "An unexpected error occurred"
    }
  }
}

const ja = {
  "translation": {
    "nav": {
      "brand": "アプリヴクラウド",
      "message": "{{title}}としてログインしています"
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

    "snackbar": {
      "dismiss": "非表示"
    },

    "error": {
      "too_short": "は{{min}}文字以上の値にしてください",
      "too_long": "は{{max}}文字以下の値にしてください",
      "alpha_num": "は半角英数字文 字または-_のみを入力してください"
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

export const i18n = i18next