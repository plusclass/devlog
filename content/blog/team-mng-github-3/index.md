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

## Firebaseとは
[Firebase](https://firebase.google.com/?hl=ja)は、Googleが提供するBaaS(Backend as a Service)です。Firestoreと呼ばれるNoSQLのデータベースやFirebase Hostingなるホスティングサービス、更にはログイン機能を実装可能なFirebase Authentication等、Webアプリを開発する上で必要なものが一通り揃っています。無料枠も大きく、小規模であればほとんど無料枠内で開発ができちゃいます。また、管理画面のUIUXもわかりやすく、弊社devチームでは発足当初からほとんどすべてのサイト制作やアプリ制作をFirebaseを基盤として作成してきました。

## GitHub Actionsを使ったCI/CD環境
devではサイト制作を含めて、JSのフレームワークを用いて開発を行っています。用途に応じて、Next.jsやGatsby.js、Nuxt.js等のフレームワークを使い分けて開発しています。これらフレームワークは、「ビルド」というコンパイルのような工程を経て、実際にサーバーにホスティングするためのhtml, css, jsのファイル群を生成します。ビルドを自動化したものをCI(Cotinuous Integration)、ビルドされたファイル群のホスティングを自動化したものをCD(Continuous Delivery)と呼びます。

GCPのCloud BuildやCircleCI等、CI/CDサービスはいくつかありますが、弊社devでは、2019年11月にリリースされたGitHub Actionsを使ってCI/CD環境を構築しています。指定したブランチへのpushをフックにActionsが走り、ビルドとホスティングまで完結してくれるので大変便利です。

## Next Dev's HINT...
今回は、GitHubの基本機能である、Issue、Project、Pull Requestについて、工夫していることを話しました。次回は、GitHub Actionsの話をする予定です。Firebase × GitHubがアツい。ぜひお楽しみに！

---
