---
title: 'カテゴリを複数つけられるようになりました'
date: '2021-08-10T12:00:00.000Z'
category: [release]
description: 'frontmatterにString[]でカテゴリ設定できるようアップデート'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。`GORAN` です。今日は弊ブログについての話です。

[はじめの投稿にあるように](/devlog-has-launched/)弊ブログは[オープンになっております]((https://github.com/plusclass/devlog))。
リポには[Update Progress](https://github.com/orgs/plusclass/projects/1)という`Project`を持たせていて、取り組んでいるアップデート事項を確認することができます。

今回は執筆体験の向上にむけて`md`ファイルの`frontmatter`においてカテゴリを配列で記述できるようなアップデートに取り組みました。

## 前提
弊ブログは[@catnoseさん](https://twitter.com/catnose99?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor)の[CatKnowsという個人ブログ](https://catnose99.com/)がオープンになっているのをいいことにヤドカリさせていただいたものになってます。

本家を見ていただければわかりますが、**そもそも複数カテゴリを設定する仕様（思想）にはなっておりません**。タグの装飾やカテゴリごとのキュレーションを考えてもひとつ設定できれば必要十分という考えなのではと推察します（`GORAN`もそう思う）が、弊チーム[@motoi](https://twitter.com/motoi_dev)から強い要望がありまして「複数タグ設定できるようにして」と命ぜられた次第でございます。笑

![image](slack.png)
（命を頂戴したのは*2021年6月12日*。あまりにも怠惰。）

## 仕様
- 配列で書けたい
- タグごとの装飾はできたい
- カテゴリページもちゃんと生成されたい

## 配列で書けたい
達成せねばならない必須事項です。とはいえ`frontmatter`は`YAML`がサポートされてるのでそもそも配列は使える仕様。

`YAML`で文字列書くときは`''`不要ですが、書く派です。
```yml{4}:title=index.md
---
title: 'カテゴリを複数つけられるようになりました'
date: '2021-08-07T12:00:00.000Z'
category: [release]
description: 'frontmatterにString[]でカテゴリを設定できるようにアップデート'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---
```

## タグごとの装飾はできたい
**タグに装飾をつけたい＝タグ固有のスタイルを持たせたい**ので、`gatsby-config.js`にてカテゴリの管理をしています。`categories`にないものを設定しようとすると、カテゴリラベルを生成するコンポーネントでエラーになります。

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
      ~~
    categories: [
        ~~
      {
        name: "Release",
        slug: "release",
        color: "#e00009",
      }
      ~~
    ]
    ~~
  },
  ~~
};
```

## カテゴリページもちゃんと生成されたい
カテゴリが複数設定されていてもそれぞれのカテゴリ一覧ページにまとめられるようにしています。

1. 全記事取得
2. 全記事で`forEach`しつつ各記事の`category`でも`forEach`して`categories`という配列を生成
3. `categories`のメンバに対して`createPage`を`forEach`で回して各カテゴリページを生成

[[notice | あまり良くない気はしています]]
| 特に②の`forEach`入れ子が気がかりで、相互に排他的じゃないなと。まぁ、`build`で時間食うだけですし、表示速度に影響はないのでそこまで気にしてませんが。（気にはなる）

```js:title=gatsby-node.js
    const posts = result.data.allMarkdownRemark.edges;
    let categories = [];
    posts.forEach(post => {
      post.node.frontmatter.category.forEach(category => {
        if (category) {
          categories.push(category);
        }
      }
      )
    });
    categories = new Set(categories);
    categories.forEach(category => {
      createPage({
        path: `/category/${category}/`,
        component: path.resolve("src/templates/categories.js"),
        context: {
          category
        }
      });
    });
```

## おわりに
（当事者ですが）書きやすくなりました。まだまだアップデート待ちの`issue`あるので、こういったリリースがあった場合は備忘録として残していこうと思います。皆様、良き執筆ライフを。

---