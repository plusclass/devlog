---
title: 'リセットCSS'
date: '2022-02-22T12:00:00.000Z'
category: [css]
description: 'とりあえずこれくらいで良いだろうのメモ'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。`GORAN` です。今日はリセット CSS についてのメモです。

## はじめに

弊社ではプロスポーツチームのお客様を中心に、チケット販促 LP の制作案件が多く存在しておりまして、静的にマークアップする場面が結構あります。以下に書き記しておくのは、そういうときに「**とりあえず最初に書いとくやつ**」として使っているものになります。

様々思想が混在するテーマだと思いますが、「ペラっと 1 枚作るときはこれくらいで良いんじゃないか」と考えております。ご自由にコピペどうぞ。

## Reset CSS

```css:title=reset.css
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  line-height: calc(1em + 0.5rem);
}

img,
picture,
iframe {
  display: block;
  max-width: 100%;
  object-fit: cover;
  border: 0;
}

input,
button,
textarea,
select {
  font: inherit;
}
button {
  border: 0;
  outline: 0;
  appearance: none;
  -webkit-appearance: none;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  background-color: transparent;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

ul,
ol {
  list-style: none;
}
```

### box-sizing

`padding` `border` を `width` に含めないようにする。

### \*（ユニバーサルセレクタ）

`margin` `padding`は`*`でやってしまう。

レンダリング遅くなるかもですが、LPでは顕著な差を感じないので、`html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video`とは書いてないです。

### height: 100%;

デフォルトの Flow layout では `height` は子要素から計算されてしまうのであらかじめ`%`に。`vh`は（だいぶ良くなりましたが）モバイルの挙動がまだ不安定なので使わないようにしてます。

### line-height

`font-size` の倍数で設定するような `1.5` のようなものだと、サイズが大きくなっていったときに行間が空きすぎてしまうので、`calc()`を使って良い感じに。

### img

`video` `canvas` `svg`なども入れて良い。でも使わないので入れない。

### button

デフォルトのブラウザ CSS は使える場面があまりないので、極力リセット。

### h 系

`h5` `h6`まで使うケースってそんなにないので、なくても良い気はする。

### ul, ol

`[role='list']`あるなしの議論はありますが、なしで。

### おまけ
[[notice | -webkit-font-smoothing: antialiased;]]
| ピクセルレベルでフォントをなめらかにしてくれるやつ。ダークモードっぽいページのときは`body`に適用する。

## おわりに

次は`Tailwind`の初期設定とか、「ペラっと 1 枚じゃないもの」でのリセット CSS 含めた assets を紹介できればと思います。

---
