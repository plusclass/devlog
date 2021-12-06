---
title: '一覧ページのデザインを変更しました'
date: '2021-08-25T12:00:00.000Z'
category: [release]
description: '少しだけトップの見せ方が変わりました'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。`GORAN` です。今日も弊ブログについての話です。

改めてですが、弊ブログは[オープンになっております](https://github.com/plusclass/devlog)。
リポにある[Update Progress](https://github.com/orgs/plusclass/projects/1)という`Project`から取り組んでいるアップデート事項を確認することができます。

今回は記事が増えてきたこともあり、一覧ページの見せ方についてのアップデートに取り組みました。

## 仕様
- 最新1記事は目立たせたい
- 6記事まではカードにしたい
- 7記事以降はリストで縦幅詰めたい

## 方針
実はこれまでも最新1記事だけはダークモードにするというプチアプデがありました。しかしこれはCSSで`:first-child`を使っただけの突貫工事でした。

今回は上記の仕様を踏襲するために、全記事の配列（`allMarkdownRemark.edges`）を`slice`で区切って

```js:title=src/pages/index.js
const postLatest = data.allMarkdownRemark.edges[0];
const postsNew = data.allMarkdownRemark.edges.slice(1,6);
const postsMore = data.allMarkdownRemark.edges.slice(7);
```

それぞれに対してグループごとのセレクタを付与していますので、

```js:title=src/pages/index.js
<h2>最新</h2>
<PostCard key={postLatest.node.fields.slug} node={postLatest.node} classProp={`latest`} />
<h2>新着</h2>
<NewFlex>
{postsNew.map(({ node }) => {
  return <PostCard key={node.fields.slug} node={node} classProp={`new`} />;
})}
</NewFlex>
<h2>その他</h2>
{postsMore.map(({ node }) => {
  return <PostCard key={node.fields.slug} node={node} classProp={`more`} />;
})}
```

あとはCSSでどうにでもできます。

## おわりに
一覧ページがトップにもなっているので、ちょっとだけ手を加えました。カテゴリページも増えてきたら同じ仕様にしようかなと思ってます。この次はページネーションが待ってるわけですが、果たして1ページあたり何記事が良いのか。調べときます。

---