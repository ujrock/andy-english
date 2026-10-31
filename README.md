# andy-english

AI英語家庭教師「アンディ先生」のWebアプリです。小学生の生徒が、毎日8分間、いつもの先生と英会話レッスンをします。

## 構成

```
andy-english/
├── web/            画面（GitHub Pagesで公開）
│   └── index.html
└── apps-script/    裏方（Google Apps Scriptに貼り付けて使う）
    ├── Code.gs
    └── appsscript.json
```

| 部分 | 役割 |
| --- | --- |
| 画面（web/） | 生徒がChromeで開くページ。マイクで話し、先生の声を聞く |
| 裏方（apps-script/） | OpenAIの一時キーの発行、Googleスプレッドシートへの読み書き、週間まとめのメール送信 |
| 音声 | OpenAI Realtime API。ブラウザが一時キーで直接つなぐ |
| データ | Googleスプレッドシート（表現リスト、覚えた英語リスト、記録、設定） |

## このリポジトリは公開されています

次のものは**絶対にコードに書かない**でください。

- OpenAIのAPIキー（Apps Scriptのスクリプトプロパティだけに置く）
- 生徒の名前・プロフィール、先生への指示文（スプレッドシートの「設定」シートに置く）
- 裏方（Apps Script）のURLと合言葉（生徒のブラウザで最初に1回だけ入力して保存する）

裏方は合言葉が合ったときだけ一時キーを発行します。

## セットアップ（概要）

1. Googleドライブにスプレッドシートを用意する
2. スプレッドシートからApps Scriptを開き、`apps-script/` のコードを貼り付ける
3. スクリプトプロパティに `OPENAI_API_KEY` と `PASSCODE` を登録する
4. Apps Scriptをウェブアプリとして公開する
5. GitHub Pagesで `web/` を公開する
6. 生徒のChromeで画面を開き、裏方のURLと合言葉を入力する

詳しい手順は、各部分ができあがった段階で追記します。
