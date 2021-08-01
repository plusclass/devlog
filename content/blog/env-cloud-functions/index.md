---
title: "Cloud Functionsで環境変数を使う"
date: "2021-08-02T12:00:00.000Z"
category: "firebase"
category2: "functions"
category3: ""
description: "バックエンド開発に便利なCloud Functions for Functionsにおける環境変数の設定方法をメモ"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## はじめに
こんにちは！明日の男子サッカー準決勝が今から楽しみなmotoiです。弊社devではバックエンドに[Cloud Functions for Firebase](https://firebase.google.com/docs/functions?hl=ja)を使っています。Firebase贔屓しているので、バックエンドもFirebase。非常に使いやすく重宝しています。

JSのフレームワークを使っていると、バックエンドを介さずともある程度のことはできてしまいますが、セキュアな情報はやはりバックエンド側でのみ持たせておきたい場面は多々あります。そこで今日は、Cloud Functionsにおける環境変数の設定の仕方を備忘録程度に書きます。

## Firebase CLIを使う
基本的には[公式](https://firebase.google.com/docs/functions/config-env?hl=ja)を参照しています。Firebase CLIを使って簡単に設定することが可能です。`firebase`コマンドを使えるようにするまでの過程は省略。
### 設定

```
firebase functions:config:set basic_auth.username="plusclass"
```

上記のようにsetコマンドでオブジェクト型の環境変数をfunctionsに登録することができます。簡単。**キーには小文字しか指定できません**。

### 取得

```
firebase functions:config:get
```

上記を実行すると、

```
{
  basic_auth: {
    username: 'plusclass'
  }
}
```

と設定した環境変数を閲覧することができます。

### 削除

```
firebase functions:config:unset basic_auth
```

オブジェクトのキーを指定すると、その配下も含めてすべて削除することができます。

## functions内での取得方法

```javascript
const functions = require('firebase-functions')
const username = functions.config().basic_auth.username
```

のように取得できます。

ただし、functionsのリージョンを設定する時には注意が必要。functionsのリージョンは、`const functions = require('firebase-functions').region('asia-northeast1')`のようにできますが、こうしてしまうと `functions.config()`で環境変数を取得できなくなってしまうので、functionsを使う箇所でリージョンを設定する必要があります。例えば、

```js
- const functions = require('firebase-functions').region('asia-northeast1')
- const https = functions.https

+ const functions = require('firebase-functions')
+ const https = functions.region('asia-northeast1').https
```

のようにします。

## Next Dev's HINT...
今回は備忘録程度の記事にしました。毎回オリジナリティ溢れた記事だけでは重たくて疲れてしまいそうなので笑、こういうのも今後は載せていきます😏


---
