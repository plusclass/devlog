---
title: "Firestoreのデータ処理~配列編~"
date: "2021-10-17T12:00:00.000Z"
category: [firebase]
description: "Firestoreにおける配列の更新"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## はじめに
こんにちは！motoiです。引き続きFiresstoreをゴリゴリ使っている中で、改めてFirestoreのデータまわりについてまとめておこうと思い、シリーズ化しました。順不同で備忘録がてら、今回は配列について書きたいと思います✎
## Firestoreの配列は注意が必要
Firestoreのデータ型には、配列型も用意されていて、データのCRUDが可能です。注意が必要なのはU(Update)で、下記のようにアップデートを記述すると元々入っていたデータは上書きされ葬り去られます。まあなんとなく直感でそうなりそうですよね。

```js:title=index.js
import { doc, updateDoc } from 'firebase/firestore'

const profileRef = doc(db, 'colUsers', 'myid')

await updateDoc(profileRef, {
  favorites: ['Real Madrid']
})
```

では配列の要素の追加・削除はどうするのか。ちゃんと用意されていますよ。

[[info | Firebase ver. 9]]
| つい最近、2021年8月25日にこれまでベータ版だったFirebaseのv9系がパブリックリリースされました。上記の記述はそれに倣ったものです。また別記事でv9については書きたいと思いますが、弊社devでは早速標準をv9にしています。

### arrayUnion・arrayRemove
結論です。公式は[こちら](https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array)。

```js:title=index.js
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

const profileRef = doc(db, 'colUsers', 'myid')

await updateDoc(profileRef, {
  favorites: arrayUnion('Real Madrid')
})

await updateDoc(profileRef, {
  favorites: arrayRemove('Drole de monsieur')
})
```

`arrayUnion()`で配列に要素を追加、`arrayRemove()`で配列の要素を削除することができます。ただし、以下注意点です。
- 既に存在している場合は、重複して追加されない
  - 大抵の場合嬉しい
- 追加される要素は、最後尾に追加される
  - 場合によっては最初に追加したい場合もあるかと思いますが、その際は現状、フロントでの処理が必要です。現在登録されている配列を→最初に要素を入れた配列を生成→登録、とかですかね。

## Next Dev's HINT...
以上、Firestoreにおける配列処理でした。他にも色々とFirestoreのデータ処理はTipsがあるので、徐々に備忘録兼ねて紹介していければと思います。また、途中にも書きましたが、Firebase 9系についても追って書きます。それではまた👋

---
