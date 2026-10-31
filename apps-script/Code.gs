/**
 * アンディ先生 裏方（Google Apps Script）
 *
 * スクリプトプロパティに次の2つを登録して使う（コードには書かない）:
 *   OPENAI_API_KEY : OpenAIのAPIキー
 *   PASSCODE       : 画面から送られる合言葉
 *
 * 画面からは POST（本文はJSON、Content-Type: text/plain）で呼び出す。
 *   { "passcode": "...", "action": "...", ...そのほかの値 }
 */

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);

    if (!checkPasscode_(req.passcode)) {
      return json_({ ok: false, error: 'passcode' });
    }

    switch (req.action) {
      case 'ping':
        return json_({ ok: true });
      // 今後追加する予定:
      //   'startSession'  … OpenAIの一時キーを発行して返す
      //   'nextLesson'    … 「今日の英語」の次の表現を返す
      //   'saveLearned'   … 覚えた英語リストに登録する
      //   'saveLesson'    … レッスン記録を保存する
      //   'getReview'     … 復習画面の一覧を返す
      //   'saveTest'      … 復習テストの結果を保存する
      default:
        return json_({ ok: false, error: 'unknown action' });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** 合言葉が正しいか確かめる */
function checkPasscode_(passcode) {
  const expected = PropertiesService.getScriptProperties().getProperty('PASSCODE');
  return Boolean(expected) && passcode === expected;
}

/** JSONで返す */
function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
