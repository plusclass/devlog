---
title: 'レスポンシブ対応におけるビューポート制御'
date: '2021-07-30T12:00:00.000Z'
category: [javascript]
description: 'タブレットや極小スマホに対応するマークアップのツラさを少しだけ和らげる動的なviewport設定'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。GORAN です。今日は`viewport`についての話をします。

**レスポンシブ対応**ってつらいですよね。ほとんどのWeb制作現場では、PC・SPそれぞれひとつの`width`に対してのみのデザインカンプしかなく

- それより大きくなったとき
- それより小さくなったとき

というのはマークアップのエンジニアが**よしなに**対応するしかない状況と思います。

かくいう弊社も、ことLPについては

- PC - `width:1920px`
- SP - `width:375px`

の1組でデザインがあがってくるケースがほとんどでして、タブレットなど中間層の対応や`375px`以下の対応はエンジニアに委託されています。

特にSPについては、`375px`で作ったデザインは`350px`以下のデバイスでほぼ間違いなく崩れますので、ツラすぎます。

[[notice | レスポンシブとは？]]
|**1つのスタイルシートと1つのHTMLで**どのデバイス・ブラウザからアクセスしても最適な表示がされている状態（だと信じています）。リダイレクトはもってのほかですが、メディアクエリでスタイルシートを出し分けするようなやり方もレスポンシブとは呼べないと思ってます。

そんな状況を解決に導く`viewport`の設定をご紹介します。

やり方はふたつありまして、どちらも`js`で`viewport`を制御する方法です。

- `375px`以下を諦める
- `userAgent`で出し分け

いずれもLPマークアップに際してはよく使っています。

## 375px以下を諦める
潔く`375px`より小さいデバイスでは`375px`**だと思って表示してね**というやり方です。
弊社では上述の通り、SPデザインを`375px`で作成しているため、`375px`のままshrinkさせることにしていますが、
Android標準は`360px`だったりするので、閾値を`360`にするケースもアリだと思います。

### コード
```js:title=js
  const viewport = document.querySelector('meta[name="viewport"]');
  function fixViewport() {
    const value =
      window.innerWidth > 375
        ? 'width=device-width,initial-scale=1'
        : 'width=375';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
```

#### 参考
以下のツイート。2点差異があります。
- 閾値`360px`
- `window.outerWidth`
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">レスポンシブの360px未満対応を終わらせるJavaScript <a href="https://t.co/zbW5gvZpN2">pic.twitter.com/zbW5gvZpN2</a></p>&mdash; TAK (@tak_dcxi) <a href="https://twitter.com/tak_dcxi/status/1342748212289916930?ref_src=twsrc%5Etfw">December 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

より広範囲に[レスポンシブコーディングについてまとめられたこちらの記事](https://zenn.dev/tak_dcxi/articles/690caf6e9c4e26)も参考になります。弊チームもマークアップでここまで徹底できる現場にしたい。

## userAgentで出し分け
冒頭で否定した内容ですが、LPのマルチデバイス対応では**スタイルシートを2つ用意してメディアクエリを使って適用するスタイルを変える**というやり方がまだまだ主流だと感じます。

その場合のビューポート制御については`userAgent`による出し分けが、特にタブレットでの挙動について安定する気がしてます。（**タブレットではPCでの表示をそのままshrinkさせる**など、デザインである程度割り切っている状態が前提です）

### コード

```js:title=js
const viewport = document.querySelector('meta[name="viewport"]');
const os = function () {
    var ua = navigator.userAgent,
        isAndroid = /(?:Android)/.test(ua),
        isiPhone = /(?:iPhone)/.test(ua),
        isPhone = (isAndroid && /(?:Mobile)/.test(ua)) || isiPhone,
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isSafari = /(?:Safari)/.test(ua),
        isTablet = /(?:iPad|PlayBook|)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)) || (isSafari || isChrome && typeof document.ontouchstart !== 'undefined' ),
        isPc = !isPhone && !isTablet;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isPc: isPc
    };
}();
if (os.isPhone) {
    viewport.setAttribute('content', 'width=375');
} else if (os.isTablet) {
    viewport.setAttribute('content', 'width=1300');
} else if (os.isPc) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=1');
}
```

#### 留意
`Symbian`や`Windows Phone`にも対応したい場合は付け加えてください。

## とはいえ
上記の手法は**根本的なレスポンシブコーディングのツラさ**に対する万能薬にはなり得ません。（あくまでLPなどの単体かつ静的なページデザインに対しての特効薬的なもの）

根本が解決された夢のような開発体験には

- ブレイクポイントについて理解のあるデザイナー
- UI/UXデザインについて理解のあるエンジニア

双方の歩み寄りが必要不可欠であるはずです。弊チームとしてはまだまだユートピアですが、直向きに歩みを進めていきたいです。向かおうとする意志だけは絶やしちゃいけないので。

---