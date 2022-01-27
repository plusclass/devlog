---
title: "手動でexportPathMapを動的に設定する"
date: "2022-01-27T12:00:00.000Z"
category: [react]
description: "Dynamic Routesを使わずにJamstackな構成にしたいとき"
author: "goran"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

こんにちは。`GORAN` です。ついこの前「手動でAPI（JSONファイル）を作ってJamstackにしたい」という謎の仕様希望があったので、その時の対応を残しておきます。

[[notice | 前提]]
| 本記事は、Next.jsのプロジェクトを前提としています。

## どんなときに使う？？
一般的に、Jamstack構成のサイトを設計するときというのは、[microCMS](https://microcms.io/)のようなHeadless CMSを用意してAPIを設計し、`[id].tsx`などでDynamic Routesを利用して静的ページ生成する場合がほとんどだと思います。

が、中には「**個別のページファイルはコードである程度やりたいけど、一覧ページとかは自動生成したい**」みたいな要望がありまして。

つまりは、いつも`[id].tsx`でやってる`getStaticPaths`を手動でやりたいときがあるということです。

## 実装
方針はシンプルで、`getStaticPaths`で`return`していた`paths`を直接`next.config.js`の`exportPathMap`に書いてしまおうというものです。

### コード

```js:title=next.config.js
module.exports = {
    ...
    exportPathMap: async function () {
        const paths = {
        '/': { page: '/' },
                ...
        }

        const arr = await require('**.json');
        const pathsArr = itemsArr.map(item => item.id);
        
        pathsArr.forEach(path => {
        paths[`/${path}`] = { page: path };
        });
    
        return paths
    }
}
```

上記のコードは以下のような`json`を想定しています。

```json:title=json
[
    {
        "id": "hogehoge",
        ...
    },
    ...
]
```

## おわりに
今回はかなりニッチな話をしましたが、実は最近「Web制作とは」というポピュラーな概念について思案しておりまして。そろそろ何か書けそうなので、次はそんなメジャーな話をしたいと思います。

本年もよろしくお願いいたします。

---