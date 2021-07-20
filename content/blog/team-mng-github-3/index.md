---
title: "devチームをつくる(1) - GitHub(3)"
date: "2021-07-19T12:00:00.000Z"
category: "github"
category2: "firebase"
category3: ''
description: "GitHub × Firebaseで、共同開発を加速させる"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## 前回のおさらい
こんにちは！[前回](https://dev.plus-class.jp/team-mng-github-2/)の続きです。Issue管理やProjectの活用方法について話した前回。今回は、予告通り、GitHubとFirebaseのインテグレーションが非常に便利なので紹介します。

## 前提
### Firebaseとは
[Firebase](https://firebase.google.com/?hl=ja)は、Googleが提供するBaaS(Backend as a Service)です。Firestoreと呼ばれるNoSQLのデータベースやFirebase Hostingなるホスティングサービス、更にはログイン機能を実装可能なFirebase Authentication等、Webアプリを開発する上で必要なものが一通り揃っています。無料枠も大きく、小規模であればほとんど無料枠内で開発ができちゃいます。また、管理画面のUIUXもわかりやすく、弊社devチームでは発足当初からほとんどすべてのサイト制作やアプリ制作をFirebaseを基盤として作成してきました。

### GitHub Actionsを使ったCI/CD環境
devではサイト制作を含めて、JSのフレームワークを用いて開発を行っています。用途に応じて、Next.jsやGatsby.js、Nuxt.js等のフレームワークを使い分けて開発しています。これらフレームワークは、「ビルド」というコンパイルのような工程を経て、実際にサーバーにホスティングするためのhtml, css, jsのファイル群を生成します。ビルドを自動化したものをCI(Cotinuous Integration)、ビルドされたファイル群のホスティングを自動化したものをCD(Continuous Delivery)と呼びます。

GCPのCloud BuildやCircleCI等、CI/CDサービスはいくつかありますが、弊社devでは、2019年11月にリリースされたGitHub Actionsを使ってCI/CD環境を構築しています。指定したブランチへのpushをフックにActionsが走り、ビルドとホスティングまで完結してくれるので大変便利です。

## GitHub × Firebase
さて、本題です。2020年10月、GitHubとFirebaseの連携が更に強化されました。Firebaseには**プレビューチャンネル**という機能があり、これは特定の期間のみ有効なランダムなURLをFirebaseが用意してくれる機能で、デバッグや期限付き公開に有効です。この機能とGitHub Actionsを連携させることで、Actionsによるビルドとプレビューチャンネルの発行を同時に行うことが可能になりました。つまり、例えば、PR作成と同時にプレビューチャンネルを発行し、レビュアーはそのURLでフロントの動作を確認することができます。

### 手順サマリー
手順はいたってシンプル。

1. コマンドの実行
2. yamlの設定

これだけ。ビルドやホスティング、slackへの通知など、yamlの設定をカスタマイズする必要がなければ、コードレスでCI環境の構築およびプレビューチャンネルのURL発行までたどり着けます。Firebase恐ろしい。

とはいえ、

- buildの設定
- slackへの通知

ここらへんはカスタマイズしたいところですね。加えて、上記の実現にFirebaseExtended/action-hosting-deploy@v0という拡張機能を使うのですが、そのオプションの説明も以下で行います。

### コマンドの実行
まずは以下のコマンドを実行します。

```bash
// Firebase Hosting未設定の場合
firebase init hosting

// Firebase Hosting設定済みの場合
firebase init hosting:github
```


## Next Dev's HINT...
今回は、GitHubの基本機能である、Issue、Project、Pull Requestについて、工夫していることを話しました。次回は、GitHub Actionsの話をする予定です。Firebase × GitHubがアツい。ぜひお楽しみに！

---
