---
title: 'ES2015（ES6）備忘録〜アロー関数〜'
date: '2021-11-15T12:00:00.000Z'
category: [javascript]
description: 'アロー関数について'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。GORAN です。今回で`ES2015（ES6）`備忘録は（ひとまず）ひと区切りです。

## アロー関数

関数式の代替構文。`function`キーワードや`return`文を省略して関数を記述できます。

```js:title=従来の関数式
function (a) {
  return a + 100;
}
```

```js:title=アロー関数
// "function" キーワードを省略できる
(a) => {
  return a + 100;
}

// "{}" と "return" を省略できる
(a) => a + 100;

// "()" を省略できる
a => a + 100;
```

[[info | 仕様詳細]]
| - `return`を省略できるのは、処理内容のステートメントが単一の場合だけです。
|   - 厳密には、「ステートメントがひとつだけ（簡潔文体）のとき`{}`を省略できて、`{}`省略時はステートメントの結果が返り値になるため、`return`が不要になる（暗黙的に`return`される）」という構図です。
| - `()`を省略できるのは、引数が単一の場合だけです。

[[notice | 返り値がオブジェクトリテラル式の場合]]
| 式の周りに`()`が必要になります。
| ```js:title=オブジェクトリテラル式
| params => ({foo: "a"});
| ```

[[notice | return 文を省略しない]]
| 特に React で関数コンポーネントを記述する場合、「`const`の`return`文を省略するか」という命題があります。僕個人としてはこれまで「何となく」省略してこなかったんですが、[一番文句言われなさそうな React コンポーネントの書き方](https://zenn.dev/seya/articles/0317b7a61ee781)を読んで、その「何となく」というのは「処理を足したくなったときに**書き換えが生じることへの嫌悪感**」だったんだと気づきまして、現在はその思想のもと、`return`を省略しない記法で統一しています。

他の`ES2015`新機能と組み合わせた記述も可能です。

```js:title=残余引数
(a, b, ...r) => expression
```

```js:title=デフォルト引数
(a = 400, b = 20, c) => expression
```

```js:title=デストラクチャリング
([a, b] = [10, 20]) => a + b;
({ a, b } = { a: 10, b: 20 }) => a + b;
```

### `this`への結び付けを持たない

アロー関数の最大の特徴であり、多くの JavaScript プログラムでアロー関数が採用されている理由のひとつでしょう。「`this`への結び付けを持たない」というのはアロー関数が通常の関数と違って**独自のスコープを持たず、アロー関数の外側と内側でスコープが保持される**ことを意味しています。言い換えれば、**アロー関数は`this`を保有せず、レキシカルスコープの`this`を参照する**ということです。

この`this`の扱い方について、通常の関数との違いをコールバックを記述した場合で見てみます。

以下のコードでは、`this`が`obj`オブジェクトであることを期待していますが、実際には`setTimeout`が`window`スコープで実行され、`count`プロパティは`window`スコープではないため、コンソールには`NaN`が表示されます。

```js:title=通常の関数
var obj = {
  count: 10,
  doSomethingLater: function () {
    setTimeout(function () {
      this.count++;
      console.log(this.count);
    }, 300);
  },
};

obj.doSomethingLater();
```

アロー関数でコールバックを記述すると、`this`は`doSomethingLater`関数の呼び出しのコンテキストである`obj`を指すため、期待した通りの実行結果が得られます。

```js:title=アロー関数
var obj = {
  count: 10,
  doSomethingLater: function () {
    setTimeout(() => {
      this.count++;
      console.log(this.count);
    }, 300);
  },
};

obj.doSomethingLater();
```

[[info | 記事内の記述例]]
| [MDN Web Docs を参考にしています](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions)。

## おわりに

次回は「チーム作り」だったり「Biz との関わり方」みたいなちょっとポエミーなものを書こうと思っています。

---
