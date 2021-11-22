---
title: "Next、はじめました"
date: "2021-11-22T12:00:00.000Z"
category: [react]
description: "初期セットアップ等、Nextを始めるにあたっての準備運動をします。"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## はじめに
こんにちは！motoiです。早速ですが、最近、React系である[Next.js](https://github.com/vercel/next.js/)を触り始めました。React系はずっと勉強しなきゃと思いつつ。基本、自社サービスはVue系の[Nuxt.js](https://github.com/nuxt/nuxt.js)で作ってきたんですが、まあ正直に言ってしまえば、新しい技術触ってみたいなって思ったのが大きな理由で、触ってみるとめちゃくちゃ楽しい！し、よりJSやってる感があります。

ということで、今後はReactに関する話もしていければということで、今日はNextで開発を始めるための準備運動ができればと思います。あくまで現状のベストプラクティスであり、今後改善していければ💪

## インストール
### next-app
まずはアプリそのもののインストールです。NuxtでもNextでも基本TypeScriptを標準とした方がよいでしょう。以下、インストールのためのCLIです。

```sh
  yarn create next-app --typescript

  # or 

  npx create-next-app@latest --ts
```

### CSS系のライブラリ
Vueでは[Vuetify](https://vuetifyjs.com/ja/)を使用することが多いですが、Reactでは[Material UI改MUI](https://mui.com/)に好印象を持っています(サイトめちゃめちゃイケてる)。また、[Tailwind](https://tailwindcss.com/)もインストールしています。もちろん併用可能で、大枠のコンポーネントはMUIに頼って、Tailwindが提供するプロパティで微調整する、といった流れですね。

以下、それぞれインストールのコマンドです。

```sh
  # MUI
  yarn add @mui/material @emotion/react @emotion/styled
  npm install @mui/material @emotion/react @emotion/styled

  # Tailwind
  yarn add tailwindcss
  npm install tailwindcss
```
[[info | Tailwindのconfigをチームで決めておこう]]
| 特にTailwindはちゃんとチームでデフォルトのconfigを用意しておくことは非常に重要です。特にフロントのデザインやクリエイティブにこだわるのであれば尚更。その辺の話はgoranがしてくれるはずなので、今回は割愛します。

### 状態管理のライブラリ
Reactが標準で提供する`useState`フックを使えば、状態管理を行うことはできます。しかし、これだけでは、コンポーネント化していくときに`prop`のバケツリレーが発生してしまい、管理が煩雑になりミスを誘発します。そのために様々な状態管理ライブラリが登場し、その中でも最も有名なのは[Redux](https://github.com/reduxjs/redux)かと思います。

しかし、弊devチームでは[Recoil](https://github.com/facebookexperimental/Recoil)を使って状態管理を行っています。思想はReduxと近いのですが、Reduxが1箇所(`store`)で状態を管理するのと異なり、複数の`atom`で状態管理を行う点が特徴的です。こちらを採用しているのはいくつか理由があるのですが、それはまた別記事で紹介します。

Recoilのインストールです。

```sh
  yarn add recoil
  npm install recoil
```

### ディレクトリ構造
アプリをインストールした直後、主なディレクトリ構造は`pages`、`public`、`styles`のみになっています。当然これだけで管理していくのは大変なので、ディレクトリ構造を決めておく必要があります。弊devチームが採用しているディレクトリ構造は以下です。

```yaml
  - pages
  - public
  - styles
  - components
    - atoms
    - molecules
    - organisms
    - Layout.tsx
  - utils
  - libs
  - hooks
    - recoil
  - types
  - apis
  - services
```

それぞれ概要を説明します。

#### components/Layout.tsx
各ページ共通の要素を記述する。例えばヘッダーやフッター等。

#### utils
共通で使用するメソッドおよび定数を格納する。

```typescript
// utils/index.ts

const convertTimestampToTime = (timestamp: { nanoseconds: number, seconds: number}) => {
  const date = new Date(timestamp.seconds * 1000)
  const yyyy = `${date.getFullYear()}`
  const MM = `0${date.getMonth() + 1}`.slice(-2)
  const dd = `0${date.getDate()}`.slice(-2)
  const HH = `0${date.getHours()}`.slice(-2)
  const mm = `0${date.getMinutes()}`.slice(-2)
  const ss = `0${date.getSeconds()}`.slice(-2)

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`
}
```

#### libs
Firebaseの認証情報等、config系を格納する。`export`のみ。

#### hooks
カスタムフックを格納する。

#### hooks/recoil
recoilで作成したhookを格納する。基本、recoilのatomとselectorとhookは、機能ごとに同一ファイルで記述するものとする。recoilで詳細は記述する。

#### types
型定義を格納する。

#### apis
外部APIとデータの授受を行うファイルを格納する。APIのデータそのものの取得しか行わず、加工などは行わない純粋関数のみを記述する。データを加工するのはservicesに格納されたファイルのみであり、他のファイルとは例外なく一切の依存関係を持たない。

#### services
apisのファイルでgetしたデータ、あるいはpostするデータを加工するファイルを格納する。apiのファイルと唯一やり取りができるディレクトリである。

だいたい読んでもらったとおりなのですが、最後の`apis`と`services`に言及すると、NoSQLでもRDBでも、DBとやり取りをする玄関口は統一しておいたほうがよくて、例えば最近Firebaseのv9がパブリックされましたが、v8と書き方が結構違います。そんな時、DBとやり取りをするファイルの中でそのデータを加工する記述をしていると、このバージョン変化に対応しづらくなってしまいます。そこで、やり取りをして生の取得データを返す`apis`と、受け取った生データを加工する`services`とを分ける、という方法を取っています。往々にして生データがそのまま使える場合もあるかと思いますが、そこはサボらず`services`を一度通してからコンポーネントに私が方がよいでしょう。

上記、まだ考えてから間もないので、もし、「ここはこうした方がいい」「これまずいのでは？」等ありましたら、ぜひTwitterまでDMか返信くれればありがたいです🥺

[[notice | 参考文献]]
| [この記事](https://blog.uhy.ooo/entry/2021-07-24/react-state-management/)で状態管理ライブラリの違いを勉強させてもらいました。また、ディレクトリ構造については、[この記事](https://zenn.dev/mongolyy/articles/01f0a4375edb2e)や[この記事](https://qiita.com/kentt/items/c86782b481ec175a57e2)を参考にさせていただきました。


今日はここまで！


---
