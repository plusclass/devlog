---
title: 'ES2015（ES6）備忘録〜スプレッド構文〜'
date: '2021-10-23T12:00:00.000Z'
category: [javascript]
description: 'スプレッド構文について'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。GORAN です。今日も`ES2015（ES6）`から新しく導入された（標準になった）機能の備忘録です。

## スプレッド構文
`...`を使うと配列やオブジェクトに関する**展開**について、以下の操作を行えます。（文字列の展開とかもできます）

- 配列・オブジェクトの連結
- 配列・オブジェクトのコピーを生成
- 配列の残り全部
- 関数の引数を配列として受け取る

### 配列・オブジェクトの連結
配列に対しては`Array.prototype.concat()`の操作が可能です。
```js:title=配列
const arrA = ['hoge', 'fuga'];
const arrB = ['piyo'];
const arrC = [...arrA, ...arrB];
```

オブジェクトに対しては`Object.assign()`の操作が可能です。
```js:title=オブジェクト
const objA = {
  member1: 'hoge',
  member2: 'fuga'
};
const text = 'piyo';
const objB = {
  ...objA,
  text
};
```

[[notice | ネストしている場合は注意]]
| スプレッド構文は浅いコピーなので、ネストしている（子の）オブジェクトについては参照が同じになります。

### 配列・オブジェクトのコピーを生成
`reverse()`などの破壊的変更を持つメソッドを使う際に、イミュータブルな配列を実現するために（元の配列を変更しないよう）スプレッド構文でコピーを作成できます。`Array.prototype.slice()`のような動きになります。
```js:title=配列
const arrA = ['hoge', 'fuga'];
const [last] = arrA.reverse();
const arrA = ['hoge', 'fuga'];
const [last] = [...arrA].reverse();
```

```js:title=オブジェクト
const arrA = ['hoge', 'fuga'];
const [last] = arrA.reverse();
const arrA = ['hoge', 'fuga'];
const [last] = [...arrA].reverse();
```

### 配列の残り全部
配列の要素数がわかっていないとき、配列の[残り全部]を表現することができます。
```js:title=配列
const arrA = ['hoge', 'fuga', 'piyo', 'hogera'];
const [first, ...others] = arrA;
```

### 関数の引数を配列として受け取る
この手法は残余引数と呼ばれます。この手法はスプレッド構文と同じ`...`が用いられますが、スプレッド構文が**展開**の操作だったのに対し、残余引数は**濃縮**の操作になります。`Function.prototype.apply()`の操作を代替できます。
```js:title=残余引数
function hogeFunction(x, y, z) { }
let arr = [0, 1, 2];
hogeFunction(...arr);
```

## おわりに
次回はアロー関数についてまとめようと思います。次でひと区切りかな。

---