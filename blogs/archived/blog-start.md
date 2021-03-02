---
description: ""
title: Hexoでブログ的な物を開設しました。
slug: blog-start
date: 2019-02-13 14:52:43
category: "Tech Blog"
tags: [ご報告]
---

atsuyaです。この度ブログ的な物をつくりました。
Tech的なお勉強のこと，文献調査ログ，趣味のことなど，まとめていきたいと思います。

<!-- more -->

### 背景

現状大学三年生なのですが，事情により休学していたため来年度も3年生です。  
休学中は単純に病気療養と，回復後はエンジニアとしてアルバイトをしていました。  
「エンジニアはアウトプットが大事だ」（スキルアップと転職市場等での評価のため）みたいな文言をよく目にしたのと，実際自身がTechブログやQiita，はてなブログ等にめちゃめちゃお世話になったのもあり，じゃあ自分でもやってみっかという軽い気持ちで，自動車学校の学科の合間に作りました。

### やったこと

以前`WordPress`を用いたCMS構築などをしたことがあったためWordPress環境を一度作ったのですが，ブラウザでの編集が面倒であったりサーバー借りなきゃいけない，Markdownで記事書きたい（他の多くの方も同様の理由でサイトジェネレータでのブログ運営に変更している）ということでJSでの静的サイトジェネレータ`Hexo`を採用しました。格安ドメインをお名前.comで取得し，GitHub Pagesでホスティングしています。メチャ楽でした。  

テーマは元々Tumblrにあった[`APOLLO`](http://sanographix.github.io/tumblr/apollo/)というテーマのHexo移植版を導入しました。結構いろんな人が使ってます。`.ejs`なので，もともとhtml書きだった私にとってもとっつきやすくて良いです。今後色々改変する予定。

Markdownの記事の更新をしたら，

```bash
% hexo d -g
```

これでデプロイ完了。とにかく楽。


様々参考とさせていただいた（パクった）エントリ等を掲載します。ありがとうございました。

- [Hexo docs](https://hexo.io/docs/setup)
- [Hexoでローカルに静的なブログを作ってみて基本構成を把握する](https://tech.qookie.jp/posts/info-hexo-local/)
- [Hexoを使って個人ブログ作成, Github Pagesにデプロイするまで (Qiita)](https://qiita.com/wawawa/items/1a2f174fb29c35302543)
- [Hexo設定ファイル](http://hatobane.github.io/hexo/Hexo-config/)
- [GitHub Pages へデプロイするには？](https://ja.nuxtjs.org/faq/github-pages/)
- [masato's blog](http://masato.github.io/)
