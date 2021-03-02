---
title: 'WordPressのTips（ログイン画面変更・最適化などのメモ）'
description: 'ログイン画面変更，SEO，画像最適化と高速化などでとりあえずやること'
slug: wordpress-tips
date: 2019-8-04 00:26:20
category: 'Tech Blog'
tags: [WordPress]
keyVisual: https://i.gyazo.com/abc431092a83b10dfaffb2f883590bef.png
---

ログイン画面変更，SEO，画像最適化と高速化などでとりあえずやることを書いておく

## ログイン画面変更

```php
// add to functions.php
function custom_login()
{
  $style = '
  <style>
    .login > #login > h1 > a {
      background-image: url(PATH/TO/IMAGE.png);
      background-size: 100%;
      width: 100%;
      height: 100px;
    }
    .login > #login > h1::after {
      content: "LOGIN DESCRIPTION";
      font-size: 1rem;
    }
  </style>
  ';
  echo $style;
}
add_action('login_enqueue_scripts', 'custom_login');
```

## SEO

`All in One SEO Pack`で meta タグ挿入，<https://search.google.com/search-console>での検索最適化

- sitemap の登録と ping

`XML Sitemap Generator for WordPress`を用いるが，この際に「html 形式のサイトマップを含める」のチェックを外すこと（search console 上で xml 外の形式だとエラーが出るため）

## サイト高速化

<https://developers.google.com/speed/pagespeed/insights> でのスピード診断を行い，SP/PC 両方での速度の向上を図る。 WordPress では高速化のためのプラグインが複数あるため，そのうち今回導入した事例を示す

### imagify

pagespeed insights の診断結果で「次世代フォーマットでの画像の配信」が上位に来る時，サイト内で読み込んでいる画像のサイズが大きさを減らせば大幅な改善が期待できる。imagify というプラグインでは，メディアライブラリ上の画像ファイルを（サムネイル等の別サイズも含め）自動的に縮小してくれるため，非常に有効。

画質が気にならない場合はすべて Ultra モードで縮小化しても構わない。背景画像等はそもそもの解像度も小さくする（resize）する

### Asset CleanUp

pagespeed insights の診断結果で「レンダリングを妨げるリソースの除外」が上位に来る場合は外部ファイルの読み込み時間を減らすことで大幅な改善が期待できる。`Asset CleanUp`を用いて以下の処置をし，速度が改善したので示す。

- css の縮小化と結合
- 使っていない css の除去
- Google Fonts の CDN リクエストが複数存在する際の一本化&async にする

(ただしフロント開発の際は Sass の map とかも無効化され可読性が著しく下がるので開発終了後に行う)
