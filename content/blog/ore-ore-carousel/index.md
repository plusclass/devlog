---
title: 'オレオレカルーセルを作りたいんじゃ'
date: '2021-07-12T12:00:00.000Z'
category: 'javascript'
category2: 'css'
category3: ''
description: 'Vanillaなやり方でカルーセルを自作する'
author: 'goran'
hero: 'hero.jpg'
ogp: 'ogp.jpg'
---

こんにちは。GORAN です。今日はカルーセル（スライダー/スライドショー）についての話をします。

まずはじめに、僕は**高速な Web 体験こそ至高**という過激派ですので、基本的にスライダー大反対です。ピュアに CSS で表現されたカルーセルで良いのです。ヒーローエリアで`autoplay`つきのスライダーを見るたびに、失われる LCP に心を痛めています。

とはいえ、商品詳細ページやヒーローエリアで1枚ずつビジュアルを見せたいシーンがあるのも事実です。なので今回は**簡易的なモノだったらこんな感じで良いんじゃないの？**という僕なりのカルーセルをご紹介します。

[[notice | カルーセル？スライダー？]]
|諸説ありますが、僕の中では以下で使い分けてます。
| - カルーセル：軽い
| - スライダー/スライドショー：重い
| 
|意味的にはループできるかで区別みたいな話もあると思うんですが、そこは関係ない派です。`ライブラリが必要かどうか` `CSSだけでも実装できるか` などパフォーマンス視点で分ける派です。なので僕の中では、スライダーとかスライドショーは前代的な重たーいモノを指してます。マジで要らないと思う。

## 作ったものの特徴
- ピュアな`JS`と`CSS`のみで実装できる
- ボタンによる擬似的なループ体験
- スクロール / スワイプ での操作
- アクティブな装飾を持つページネーション

## コード
コピペどうぞ。[すごい近い思想の記事がありまして](https://zenn.dev/phi/articles/modern-javascript-css-carousel)、`index`の取り方とか参考にさせていただきました。

[[notice | 仕組みだけ]]
|装飾とかは一切してません。カスタマイズして楽しんでください。

```html:title=html
<ol class="carousel">
  <li class="carousel-item">
    <div>1</div>
  </li>
  <li class="carousel-item">
    <div>2</div>
  </li>
  <li class="carousel-item">
    <div>3</div>
  </li>
</ol>

<button class="button-prev">前</button>
<button class="button-next">次</button>

<nav id="pagination" class="pagination">
  <div class="pagination-item active" data-hash="1">1</div>
  <div class="pagination-item" data-hash="2">2</div>
  <div class="pagination-item" data-hash="3">3</div>
</nav>
```

```js:title=js
class Carousel {
  constructor(query) {
    this.carousel = document.querySelector(query)
    this.pagination = document.querySelector('#pagination')
    this.paginationItem = document.querySelectorAll('.pagination-item')
    this.maxIndex = Math.round(
      this.carousel.scrollWidth / this.carousel.clientWidth
    )
  }
  get index() {
    var index = Math.round(this.carousel.scrollLeft / this.carousel.clientWidth)
    return index
  }
  goto(index) {
    var i = (index + this.maxIndex) % this.maxIndex
    this.carousel.children[i].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }
  next() {
    this.goto(this.index + 1)
  }
  prev() {
    this.goto(this.index - 1)
  }
  nav(i) {
    this.goto(i - 1)
  }

  scroll() {
    let scroll = this.carousel.scrollLeft
    let carouselItem = this.carousel.clientWidth
    if (scroll % carouselItem == 0) {
      this.paginationItem.forEach((item) => {
        item.classList.remove('active')
      })
      this.pagination.children[this.index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      this.pagination.children[this.index].classList.add('active')
    }
  }
}

window.onload = function () {
  var carousel = new Carousel('.carousel')
  var buttonPrev = document.querySelector('.button-prev')
  var buttonNext = document.querySelector('.button-next')
  var paginationItem = document.querySelectorAll('.pagination-item')
  var scrollTarget = document.querySelector('.carousel')

  buttonPrev.onclick = () => {
    carousel.prev()
  }
  buttonNext.onclick = () => {
    carousel.next()
  }
  paginationItem.forEach((item) => {
    item.addEventListener('click', (e) => {
      let targetIndex = item.dataset.hash
      carousel.nav(targetIndex)
    })
  })
  scrollTarget.onscroll = () => {
    carousel.scroll()
  }
  scrollTarget.onwheel = () => {
    carousel.scroll()
  }
}
```

```css:title=css
* {
  margin: 0;
  padding: 0;
}

.carousel {
  width: 300px;
  height: 300px;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  scroll-snap-align: start;
  flex-shrink: 0;
  background: #000;
  color: #fff;
}
.carousel::-webkit-scrollbar {
  display: none;
}

button {
  outline: none;
  border: none;
  background: none;
  width: 30px;
  height: 30px;
  border: 1px solid #000;
}
.pagination {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
}
.pagination-item.active {
  color: #f00;
}
```

## scrollIntoView API
[推移のアニメーションを定義できる](https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView)。スマホだとアニメーション効かないけど。

## scroll-snap
s○iperやs○ickなどの邪悪なスライダーライブラリを駆逐する希望のCSSプロパティ。[一昨年くらいから話題](https://developers.google.com/web/updates/2018/07/css-scroll-snap)。CSSだけで「ピタッと止まる」を表現できます。

### scroll-snap-type
[スナップの体験を付与するプロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/scroll-snap-type)。`x mandatory`とすることで、横方向のスクロールに対してスナップを起動し、ある程度の閾値までコンテナ内に要素を止めることができます。

### scroll-snap-align
[スナップした要素をコンテナ内のどこで止めるかを決めるプロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/scroll-snap-align)。`start`とすることで、コンテナの先頭に要素を合わせられます。

## まだできないこと
前後のアイテムが見えるようなデザインの再現はできません。そもそもこういった見せ方に一定のアレルギーがありつつも、例えば**昔の iTunes のアルバムアートワーク**のような見せ方は嫌いじゃありませんので、いつか実現させようと思ってます。あの滑らかな体験まで再現したい。CSSでの見た目作りはそんなに大変じゃないんですけど、JSによる体験の再現が難しいんですよね。[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)を使ってできそうな気はしてますけども。頑張ります！

---