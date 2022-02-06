---
title: "importとrequireの違い"
date: "2022-02-07T12:00:00.000Z"
category: [javascript]
description: "改めて"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## はじめに
こんにちは！motoiです。今日はテックな話を。今日はモジュールの呼び出し方について、`import`と`require`の違いを説明します。もちろん当たり前に理解しているよ、という方は読み飛ばしていただいて良いです。

[[notice | モジュールとは]]
| ひとつのアプリケーションを構成するJSを1つのファイルに記述するのではなく、ファンクションごとに分割していくことをモジュール化と言います。

## ESM, CJS, UMD, AMD
はい、いきなり略語のオンパレード。それぞれモジュールの主要な読み込み方法です。

- ESM: ECMAScript Modules
- CJS: CommonJS Modules
- UMD: Universal Module Definition
- AMD: Asynchronous Module Definition

です。そして、`import`と`require`はそれぞれESM方式、CJS方式の読み込み方法です。そもそも大きな違いとして、読み込み方式の違いが挙げられるということですね。ではそれぞれ具体的に記述方法について見ていきましょう。

## import
### 構文
まず読み込むより前に、exportする必要があります。exportの方法は以下です。

```typescript:title=increment.ts
export const increment = (i: number) => i + 1

// or 

const increment = (i: number) => i + 1
export { increment }
```

そして`import`の方法にも2つあります。

```typescript:title=index.ts
import { increment } from './increment'
console.log(increment(9)) // 10

// or

import * as increment from './increment'
console.log(increment(9)) // -> 10
```

### 特徴
`import`はファイルの上部に記述する必要があり、それはつまり動的に変更できないことを意味します。そして、ESM方式はES6から導入された方式なので、古いブラウザでは動作しない可能性があります。

[[notice | どうしても動的に変更したい]]
| どうしても動的に変更したい場合は、import()を使うことで可能です。詳しくは[こちらの記事](https://typescriptbook.jp/reference/import-export-require)を御覧ください。

## require
### 構文

```typescript:title=increment.ts
module.exports = (i: number) => i + 1
```

```typescript:title=index.ts
const incrementMethod = require('./increment')
console.log(incrementMethod(9)) // 10
```

module.exportsだと関数の名前を呼び込み側で自在に変えてしまえるので、関数の名前に一貫性をもたせるなら、以下のように`exports`を使って関数の名前を呼び出し元で定義することも可能です。

```typescript:title=increment.ts
exports.increment = (i: number) => i + 1
```

```typescript:title=index.ts
const { increment } = require('./increment')
console.log(incrementMethod(9)) // 10
```

### 特徴
`import`と違い、`require`はファイルのどこに記述しても良いです。しかし、最も大きな違いとして、Node.jsでしか動作しない点が挙げられます。つまり、フロント側で`require`を使用することはできず、サーバーサイドでのみ使用可能です。

 
## まとめ
普段、JSのフレームワークを使っていると、Webpackがうまく処理をして、環境関係なくどちらも利用可能にしてくれるので、あまり意識せずとも使えてしまいますが、上記の理解をしながら使い分けをしていった方がよいと思い、今回紹介しました。ではまた！



### 参考文献
[https://book.yyts.org/features/import-export-require](https://book.yyts.org/features/import-export-require)
[https://qiita.com/minato-naka/items/39ecc285d1e37226a283](https://qiita.com/minato-naka/items/39ecc285d1e37226a283)

---
