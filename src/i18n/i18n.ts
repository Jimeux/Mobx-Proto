declare var require: (moduleId: string) => any
const i18next = require("i18next")
const LanguageDetector = require("i18next-browser-languagedetector")

export const I18N_LANGUAGE = "I18N_LANGUAGE"

//TODO: These will live in separate files
const en = {
  "translation": {
    "nav": {
      "brand": "Appliv Cloud",
      "message": "You're logged in as {{title}}",
      "tabs": {
        "writer": {
          "home": "Home",
          "tickets": "Get a ticket"
        },
        "editor": {
          "home": "Home",
          "tickets": "Publish settings"
        }
      },
      "user_menu": {
        "settings": "Settings",
        "log_out": "Log out"
      }
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
      },
      "index": {
        "id": "ID",
        "app_id": "App ID",
        "article_id": "Article ID",
        "status": "Status",
        "comment": "Comment",
        "page_info": "{{from}}-{{to}} of {{count}}"
      }
    },

    "article": {
      "write": {
        "write_article": "Write article",
        "points": "Recommended Points",
        "intro_article": "Introductory article",
        "submit": "Submit"
      },
      "publish": {
        "submit": "Publish"
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
      "message": "{{title}}としてログインしています",
      "tabs": {
        "writer": {
          "home": "ホーム",
          "tickets": "チケット取得"
        },
        "editor": {
          "home": "ホーム",
          "tickets": "公開設定"
        }
      },
      "user_menu": {
        "settings": "設定",
        "log_out": "ログアウト"
      }
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

    "ticket": {
      "create": {
        "title": "チケット作成",
        "submit": "作成",
        "applicationId": "アプリ ID",
        "comment": "コメント",
        "success": "ID {{id}}のチケットが作成されました"
      },
      "index": {
        "id": "ID",
        "app_id": "アプリID",
        "article_id": "記事ID",
        "status": "ステータス",
        "comment": "コメント",
        "page_info": "{{from}}-{{to}} of {{count}}"
      }
    },

    "article": {
      "write": {
        "write_article": "記事を書く",
        "points": "おすすめポイント",
        "intro_article": "紹介記事",
        "submit": "提出"
      },
      "publish": {
        "submit": "公開する"
      }
    },

    "error": {
      "required": "必須項目です",
      "min_length": "{{min}}文字以上の値にしてください",
      "max_length": "{{max}}文字以下の値にしてください",
      "integer": "整数にしてください",
      "positive_int": "正の整数でなければならない",
      "alpha_num": "半角英数字文 字または-_のみを入力してください",
      "unexpected": "予期しないエラーが発生しました"
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