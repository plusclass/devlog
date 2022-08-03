---
title: 'transformプロパティを個別に指定'
date: '2022-08-03T12:00:00.000Z'
category: [css]
description: 'web.devにてChrome対応のアナウンスがありましたので便乗して'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。`GORAN` です。今回は[web.dev の記事](https://web.dev/css-individual-transform-properties/)からインスパイアされた内容です。

## `transform`プロパティ

`transform`は対象の要素に対して以下の操作を行うことができる CSS プロパティです。

- 拡大縮小：`scale`
- 回転：`rotate`
- 傾斜：`skew`
- 移動：`translate`

[[notice | matrix は？]]
|上記の操作を一括（行列）で操作できる関数。`matrix3d`のショートハンド。

### 記述例

```css:title=transformの基本形
.target {
  transform: translateX(50%) rotate(30deg) scale(1.2);
}
```

## 個別指定

[Chrome 104 において、上述の操作を個別に指定することが可能になりました](https://chromestatus.com/feature/5705698193178624)。モダンブラウザ（Chrome・Firefox・Edge・Safari）では使えるようになったと判断して良いと思います。なぜか Chrome だけ遅れてたので、ようやくって感じでしょうか。

先ほどの記述は以下のように書き換えられます。

```css:title=transformの個別指定
.target {
  translate: 50% 0;
  rotate: 30deg;
  scale: 1.2;
}
```

### 実行順序

[W3C の規定にあるように](https://www.w3.org/TR/css-transforms-2/#ctm)、`transform`の処理のされ方は決まっていて、必ず`translate`→`rotate`→`scale`の順に実行されます。
これは個別指定でも同様で、宣言された順番と実行される順序が一致しないケースがあります。
例えば以下のように記述しても先ほどの例と同じ結果が得られます。

```css:title=transformの個別指定
.target {
  rotate: 30deg;
  translate: 50% 0;
  scale: 1.2;
}
```

## 何が嬉しいのか

### 記述量が減る

`transform`という記述をしなくて済むので「コードが短くなってよりわかりやすくなる」というのがあると思います。

`@keyframes`の記述は特に顕著で、これまでは

```css:title=@keyframeのBEFORE
// prettier-ignore
@keyframes anim {
  0% { transform: translateX(0%); }
  5% { transform: translateX(5%) rotate(90deg) scale(1.2); }
  10% { transform: translateX(10%) rotate(180deg) scale(1.2); }
  90% { transform: translateX(90%) rotate(180deg) scale(1.2); }
  95% { transform: translateX(95%) rotate(270deg) scale(1.2); }
  100% { transform: translateX(100%) rotate(360deg); }
}

.target {
  animation: anim 2s;
  animation-fill-mode: forwards;
}
```

だったのが以下のようになり、

```css:title=@keyframeのAFTER
// prettier-ignore
@keyframes anim {
  0% { translate: 0% 0; }
  100% { translate: 100% 0; }

  0%, 100% { scale: 1; }
  5%, 95% { scale: 1.2; }

  0% { rotate: 0deg; }
  10%, 90% { rotate: 180deg; }
  100% { rotate: 360deg; }
}

.target {
  animation: anim 2s;
  animation-fill-mode: forwards;
}
```

機能分離ができて短くわかりやすくなります。

（`// prettier-ignore`は悪しからず）

### アニメーションのパフォーマンス最適化

`transition`や`will-change`を使いたいケースです。

これまでは

```css:title=transitionとwill-changeのBEFORE
.target-transition {
  transition: transform 0.4s;
}
.target-will-change {
  will-change: transform;
}
```

のように記述するしかなかったので、一部しか使わなくても一括の設定しかできなかったのですが、

```css:title=transitionとwill-changeのAFTER
.target-transition {
  transition: translate 0.4s, rotate 0.2s;
}
.target-will-change {
  will-change: translate, rotate;
}
```

操作ごとの設定ができるようになりました。[こちらの方がパフォーマンスに優れることもわかっています](https://web.dev/animations-guide/)。

### 表現の自由度

`keyframes`にしても`transition`にしても、`transform`の操作を個別に指定できるようになったので、「`translate`は素早く、`rotate`はゆっくり」みたいなことが書けるようになりました。

## おわりに

弊社ではなかなか「CSS アニメーションを最適化する」事案がないので、活躍の場は限られてますが、自社サービスなどパフォーマンスを拘れるプロダクトには積極的に適用していきたいですね。

---
