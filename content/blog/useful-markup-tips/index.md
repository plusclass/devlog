---
title: 'ちょっと便利なヤツら'
date: '2022-05-09T12:00:00.000Z'
category: [css, html]
description: 'マークアップに役立つタグとかプロパティとか'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。`GORAN` です。今日は最近使ってるちょっと便利な CSS・HTML をご紹介。

## max-content

[max-content](https://developer.mozilla.org/ja/docs/Web/CSS/max-content)は、オーバーフローが発生しても中身が折り返されずに内在的な最大幅のまま表示してくれるキーワード（値）。高さに対しても使用できる。「`flex`で作った横並びのメニューをスマホサイズでは横スクロールさせたい」と思ったときに便利。

```css:title=max-content
.ovewflow-content {
  width: max-content;
}
```

## clamp()

[clamp()](https://developer.mozilla.org/ja/docs/Web/CSS/clamp)は変動する値を最小値と最大値でフタすることができる CSS 関数記法。`clamp(MIN, VAL, MAX)`の形で使用する。これは`max()(MIN, min()(VAL, MAX))`と同義。viewport の大きさに合わせてフォントサイズを設定するときに便利。

```css:title=clamp()
p {
  font-size: clamp(1.8rem, 2.5vw, 2.8rem);
}
```

[[simple | 意訳]]
|基本`2.5vw`（viewport の横幅 2.5%）だけど、`1.8rem`未満にはならないし`2.8rem`より大きくもならない。

## Media Queries Level 4

[Media Queries Level 4 はまだ Candidate Recommendation Draft ですが](https://www.w3.org/TR/mediaqueries-4/)、最新のブラウザ（特に Chrome・Safari）では動くものが増えてきて、個人的なやつにはぼちぼち使い始めて良いかなと思ってます。様々ありますが、個人的には`range`型のメディアクエリを作れるようになったこと（Range Context）が 1 番嬉しい。

```css:title=rangecontext
@media (360px <= width <= 780px) {
  body {
    background: green;
  }
}
```

## wbr

[wbr](https://developer.mozilla.org/ja/docs/Web/HTML/Element/wbr)は、改行可能位置（改行されたい場所）を記述できる HTML タグ。`<br>`だと必ず改行されるけど、`<wbr>`は必要なときだけ。「幅に収まるならそのまま、収まらなければ改行して欲しい」と思ったときに便利。

```html:title=wbr
<p>
  長い長い長いワードここで区切りたい<wbr />長いワードここで区切りたい<wbr />長い長いワード
</p>
```

[[alert | 注意]]
|`white-space: nowrap;` で打ち消されることがあるので、使用を避ける。どうしても外せない場合は`word-break: keep-all;` を併用する。

## おわりに

前回、『次は`Tailwind`の初期設定とか、「ペラっと 1 枚じゃないもの」でのリセット CSS 含めた assets を紹介できればと思います。』とか言っておきながら違うの書いちゃったので、次こそは。

---
