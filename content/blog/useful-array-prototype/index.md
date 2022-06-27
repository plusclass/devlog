---
title: "よく使う配列メソッド"
date: "2022-06-28T12:00:00.000Z"
category: [javascript]
description: "普段よく使うものをピックアップ"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## はじめに
こんにちは！motoiです。最近新サービスのリリースがあり、なかなか更新できず…自省中です。これからはちゃんと更新していく、はず…

さて今回は、かなり具体の話になりますが、普段私がよく使う配列メソッドを紹介したいと思います。

## Arrayオブジェクト
[MDNの公式サイト](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)に配列オブジェクトのすべてが紹介されています。配列型は普段からよく使うメジャーな型の1つですが、プリミティブ型ではないため、配列を操作するメソッドを所有します。先の公式サイトに多くのメソッドが載っていますが、その中でも特に普段使うものを以下に紹介します！

### every
配列の要素の全てが条件を満たしていれば`true`、そうでなければ`false`を返す。

```typescript:title=every.ts
const isBelowThreshold = v => v < 40
const array1 = [1, 55, 39, 4, 8, 10]
const array2 = [1, 22, 39, 4, 8, 10]
console.log(array1.every(isBelowThreshold)) // false
console.log(array2.every(isBelowThreshold)) // true
```

### some 
1つでも条件を満たしていれば`true`を返す。

```typescript:title=some.ts
const hasOverThreshold = v => v > 50
const array1 = [1, 55, 39, 4, 8, 10]
const array2 = [1, 22, 39, 4, 8, 10]
console.log(array1.every(hasOverThreshold)) // true
console.log(array2.every(hasOverThreshold)) // false
```

### map
配列のすべての要素を取り出して、その結果から新しい配列を生成する。オブジェクト配列のキーから要素を取り出して、配列を作るときに便利。

```typescript:title=map.ts
type TPerson = {
  name: string,
  age: number
}

const array = [
  {
    name: '津田',
    age: 45
  },
  {
    name: 'ユースケ',
    age: 44
  }
]

const getName = (v: TPerson) => v.name

console.log(array.map(getName)) // ['津田', 'ユースケ']

```

### filter
配列の要素の中で、条件に合致した要素のみを返し新しい配列を生成する。

```typescript:title=filter.ts
const words = ['This', 'is', 'a', 'huge', 'huge']

const result = words.filter(word => word.length > 2)

console.log(result)
// ["This", "huge", "huge"]
```

### reduce
配列の前後の要素で操作を行いたいときに有効。割と万能で、いろんなメソッドが`reduce`で表現できる。引数には、

- `callbackFn`: 4つの引数を取る
    - `previousValue`: 前回の値
    - `currentValue`: 現在の値
    - `currentIndex`: 現在の位置 ※省略可
    - `array`: 対象の配列 ※省略可
- `initialValue` ※省略可
    - コールバックが初めて呼び出された時の初期値。
    

よく使われる例は、配列内の合計値を算出する例。

```typescript:title=reduce.ts
const array1 = [1, 2, 3, 4];
const reducer = (pre, cur) => pre + cur

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer))
// 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5))
// 15
```

以下のように、mapやfilterをreduceで表現することもできる。

```typescript:title=reduce2.ts
// 最大値を求める
const array = [1, 10, 3, 5, 2]
const getMax = (pre, cur) => pre > cur ? pre : cur
console.log(array.getMax(getMax)) // 9


// filterの代わり
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const method = (pre, cur) => {
  if (cur % 3 === 0) {
    pre.push(cur)
  }
  return pre
}
const result = arr.reduce(method, [])
console.log(result)
// [ 3, 6, 9 ]


// mapの代わり
const arr = [11, 22, 33];
const method = arr.reduce((acc, value, index) => {
  acc[index] = 100 + value
  return acc
})
const result = arr.reduce(method, [])
console.log(result)
// [ 111, 122, 133 ]
```

`reduce`を使えば`map`も`filter`も実現できるわけですが、可読性や処理速度の問題から、やはりちゃんと`map`や`filter`を使う場面ではそれらを使うのが良いでしょう。

### flatMap
配列をフラットにするためのメソッド。

```typescript:title=flatMap.ts
const array = [1, 2, [3, 4], 5, 6]
const flatArray = array.flatMap(x => x)
// [1, 2, 3, 4, 5, 6]
```

正直、こういう使い方はあまりしなくて、これを応用して、`filter`と`map`を同時に実現することができます。下の例では、10までの自然数を格納した配列から、3の場合数のみを取り出してそれぞれ1を加えて、それらの数字で配列を新たに作成しています。

```typescript:title=flatMap2.ts
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const newArray = array.flatMap(
	x => x % 3 === 0 ? x + 1 : []
)
// [4, 7, 10]

// これでも同じ配列を得られる。
const newArray2 = array.filter(x => x % 3 === 0).map(y => y + 1)
```

三項演算子を使って条件に当てはまればその値を、そうでなければ空配列を返し、最後にflatにすれば`filter`と`map`を組み合わせたことと同じ意味になります。

## まとめ
他にももちろん使うものはありますが、特によく使うもの、あるいはそれに関連するものを紹介しました。ところで、最近ES2022が正式リリースされましたね。まだちゃんとはチェックしてないですが、クラスで`static`や`private`が使えるようになったり、`async`がなくとも`await`を使って非同期処理ができたり、配列の末尾のみを取り出す`at`メソッドができたり、色々目白押しみたいなので、またここで紹介できればと思います。それでは👋






---
