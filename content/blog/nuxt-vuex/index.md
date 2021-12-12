---
title: "NuxtでVuexを"
date: "2021-12-13T12:00:00.000Z"
category: [nuxt]
description: "vuex-module-decoratorsの紹介"
author: "motoi"
hero: "hero.jpg"
ogp: "ogp.jpg"
---

## はじめに
こんにちは！motoiです。先日会社の納会がありまして、会社としては丸10年を無事迎えることができました！メデタイ✨個人的には、年間最優秀選手(MVP)にも選んでいただき、なお一層帯を締め直して仕事に取り組んでいるこの頃です。

さて、今日はライトめな内容で。Nuxtでvuexを使う際のTipsを書きます。

[[simple | devチームの受賞]]
| 個人的には、今回のMVPはdevチームの受賞と思っています。それくらいチームで進化ができた一年でした。まだまだこれから🔥

![image](mvp.jpg)

## Nuxt×Vuex
NuxtはVue.jsをベースとしたフレームワークです。基本、Vueで開発をする際には、標準的に[Nuxt](https://nuxtjs.org/)を採用しています。[Vuex](https://vuex.vuejs.org/ja/)は、Vueにおいて状態管理を行うためのライブラリです。Nuxtには標準的にVuexがインストールされており、storeディレクトリにstateやmutation、actionを記述すれば使えるようになるのですが、Nuxt公式でも推奨されている、[vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators)を使った方がわかりよいので、今回はこのモジュールの使い方を紹介します。

### インストール

```
npm install -D vuex-module-decorators
// or 
yarn add -D vuex-module-decorators
```

### ファイルの準備
このモジュールを使うために、事前に2つファイルを用意します。

まずは、`@/store/index.ts`。

```typescript:title=@/store/index.ts
import { Store } from 'vuex'
import { initialiseStores } from '@/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '@/utils/store-accessor'
```

次に、importしている`@/utils/store-accessor.ts`。

```typescript:title=@/store/index.ts
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Sample from '@/store/sample_store'

let SampleStore: Sample
function initialiseStores(store: Store<any>): void {
  SampleStore = getModule(Sample, store)
}

export { initialiseStores, SampleStore }
```

`Sample`型を`@/store/sample_store`で作成し、インポートします。そして、`getModule`を格納した`SampleStore`をエクスポートすることで使用します。

そして、`@/store/sample_store.ts`です。これがstate管理するファイルで、使用用途ごとに作成していきます。作成したら、上記のaccessorに記述します。

```typescript:title=@/store/sample_store.ts
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/api'

export type Sample =  {
  id: string | null
  name: string | null
}

export type SampleState =  {
  sample: Sample
}

@Module ({ stateFactory: true, namespaced: true, name: 'sample' })
export default class SampleModule extends VuexModule implements SampleState {

  // stateを定義
  public sample: Sample = {
    id: null,
    name: null,
  }

  // mutationを定義
  @Mutation
  private setSample (payload: Sample) {
    this.sample = {
      id: payload.id,
      name: payload.name,
    }
  }

  // actionを定義
  @Action ({ rawError: true })
  public async updateSample (data: Sample) {
    this.setSample(data)
  }
}

```

あとは、使いたいファイルで以下のように呼び出せば、簡単に状態を呼び出せますし、更新もできます。

```typescript:title=sample.vue
<script>
import { SampleStore } from '@/store/index'

(中略)

userId: string = SampleStore.sample.id // 呼び出し

(中略)

sampleMethod() {
  SampleStore.updateSample({ name: 古畑任三郎, id: furuhata }) // 更新
}

</script>
```

`vuex-module-decorators`を使うことで、`commit`や`dispatch`等を使わずとも、シンプルに値の更新と呼び出しができるようになります。更新は、上記と同じようにしてmutationを直接呼び出すこともできるのですが、mutationは直接呼び出さず、必ずactionを入り口とした方が、メンテナンス上よいでしょう。

### 注意点

これは`vuex-module-decorators`に限った話ではないですが、mutationとactionは、引数の数は1つだけです。なので、上記の例のように、複数の値を同時に状態管理したければ、オブジェクト形式にします。もちろん、関連する値であれば、です。全く関係のないものをオブジェクトに入れて状態管理するのは好ましくありません。ファイルの準備が少し面倒かもしれませんが、その際はちゃんと別ファイルに分けて作成しましょう。
 
## Next Dev's HINT...
デフォルトの方法に加えて、NuxtでVuexを使う方法はいくつかあるのですが、個人的にはその中でももっとも分かり良かった`vuex-module-decorators`を今回は紹介しました。次は少し一年を振り返った内容にしようかなと考えています。それでは！

---
