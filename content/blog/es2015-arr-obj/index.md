---
title: 'ES2015（ES6）備忘録〜配列・オブジェクト〜'
date: '2021-09-11T12:00:00.000Z'
category: [javascript]
description: 'ES2015（ES6）で配列とオブジェクトに導入された新機能について'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。`GORAN` です。今日は`ES2015（ES6）`から新しく導入された機能の備忘録です。

## デストラクチャリング（分割代入）
配列やオブジェクトを
- 代入する
- 引数として受け取る

際に、必要なプロパティのみ取捨選択できる機能。

配列は順番通り。
```js:title=配列
const arr = ['hoge', 'fuga', 'piyo'];

const [a, b, c] = arr;
console.log(a); // "hoge"
console.log(b); // "fuga"
console.log(c); // "piyo"
```

オブジェクトはキー値の通り。
```js:title=オブジェクト
const obj = {
    id: 1,
    is_hoge: true
};

const {is_hoge, id} = obj;

console.log(id); // 1
console.log(is_hoge); // true
```

## オブジェクトリテラルの改善
変数をオブジェクトのプロパティ値として記述する場合、プロパティ名を省略できる機能が追加されました。
```js:title=省略記法1
const hoge = 'string';
const fuga = 10;

const obj = { hoge, fuga };

console.log(obj) // {hoge: "string", fuga: 10}
```

この機能では関数もそのままプロパティとしてオブジェクトリテラル内に書くことが可能です。
```js:title=省略記法2
const firstName = 'Tom';
const lastName = 'Brown';
const showName = function() {
  console.log(`ども ${this.firstName} ${this.lastName} です〜`)
}

const obj = { firstName, lastName, showName };

obj.showName(); // ども Tom Brown です〜
```

また、オブジェクトリテラル内に関数を記述する際、`function`キーワードの省略が可能になりました。
```js:title=省略記法3
const obj = {
  hoge,
  fuga,
  piyoFunc() {
    let hogehoge = this.hoge.toUppperCase();
    console.log(`${hogehoge}`)
  }
}
```

## おわりに
次回はスプレッド構文についてまとめようと思います。

---