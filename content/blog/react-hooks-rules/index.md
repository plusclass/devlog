---
title: "React hookのルール"
date: "2022-04-04T12:00:00.000Z"
category: [react]
description: "改めて"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## はじめに

すっかりご無沙汰となってしまいました…motoi です。最近はめっぽう Next.js ばかり触っているので、今日は React 関連の話をします。Vue の思想も良く出来ていると思いますが、やはり書いてて楽しいのは React ですね。今日はそんな React の hooks の話をします 😌

## React hooks とは

まずはじめに軽く hooks 自体の説明を。React hooks はバージョン 16.8 から追加された機能で、状態管理やその他 React のいろんな機能を、クラスを記述せずとも関数コンポーネントの中で簡単に使うことを可能にする非常に便利な機能です。よく使われるのは、状態管理を行う `useState`、DOM がレンダリングされた後にあるメソッドを実行する際に使う `useEffect` 等ですね。それぞれ説明していてはキリがないので今回は省略します。

[[notice | すべては公式ドキュメントの中に]]
| 基本的には[公式ドキュメント](https://ja.reactjs.org/docs/hooks-intro.html)の内容を踏襲しています。日本語 ver もあるので読みやすいですね。

## hooks に使用にはルールがある

当然、使い方にはルールがあります。以下にまとめます。

### hooks は component の最外部でのみ使用可能

まずは以下の例を御覧ください。結論、以下のコードではエラーが発生します。

```typescript:title=example.tsx
const Example = () => {
  const [value, setValue] = useState("");
  const displayPathname = () => {
    const { pathname } = useRouter();
    setValue(pathname);
  };

  return (
    <>
      <button onClick={displayPathname}>現在地を表示する</button>
      <p>{value}</p>
    </>
  );
};

export default Example;
```

エラー内容を見てみると、

> Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
>
> 1. You might have mismatching versions of React and the renderer (such as React DOM)
> 2. You might be breaking the Rules of Hooks
> 3. You might have more than one copy of React in the same app
>    See [https://fb.me/react-invalid-hook-call](https://fb.me/react-invalid-hook-call) for tips about how to debug and fix this problem.

これは 1 つ目のルールです。**hooks はコンポーネントの最外部で使用する必要があります**。上記のコードでは、`useState`は最外部で使用されているのでいいのですが、route 情報を取得する際に使用する`useRouter`フックを`displayPathname`メソッド内で使っているのでエラーとなっています。単純に`const { pathname } = useRouter();`を`useState`と同じレベルに記述すればエラーは解消されます。

更に言うとこれは、**関数コンポーネント内でしか使用できない**ということを意味しています。例えば、API 通信を行うために定義した JS メソッド内で hooks を使用することはできません。

### 独自フックには use をつける

独自に hooks を作ることもできます(カスタムフック)。個人的な主張として、**各ファイルの責任の分離は明確にした方がよい**と思っています。上の例で言うと、`Example`は状態管理という責任と DOM の描写という責任を有することになります。この程度の例ではなんら問題はないですが、より複雑になった時、責任分離を意識したディレクトリ構成をとっていると、複数人で競合を回避しながら開発することが出来ます。

ということで、1 つ目のエラーを解消しつつ、上記の例を責任分離した形で書いてみましょう。

```typescript:title=example.state.ts
export const useExample = () => {
  const [value, setValue] = useState("");
  const { pathname } = useRouter();
  const displayPathname = () => {
    setValue(pathname);
  };

  return { value, displayPathname };
};
```

```typescript:title=example.tsx
import { useExample } from "./example.state";

const Example = () => {
  const { value, displayPathname } = useExample();
  return (
    <>
      <button onClick={displayPathname}>現在地を表示する</button>
      <p>{value}</p>
    </>
  );
};

export default Example;
```

2 つ目のルールというのが、`useExample`に関するルールです。このように新たにカスタクフックを定義することができるのですが、その際に注意するのが、**カスタムフックの名前には必ず use をつける**というルールです。このルールに準拠していないと、以下のエラーが発生するので注意しましょう。

> React Hook "XXX" is called in function "XXX" which is neither a React function component or a custom React Hook function. (react-hooks/rules-of-hooks)

## まとめ

結論、公式ドキュメントはちゃんと読みましょう、という話なのですが、なかなか経験しないと身にならないのも事実です。千里の道も一歩から、引き続き愚直に経験を積んでいきたいと思います。ではまた！

### 参考文献

[公式ドキュメント](https://ja.reactjs.org/docs/hooks-intro.html)

---
