---
title: herokuでPython製LINEbot+WebAppをCIする
slug: flask-line-bot-heroku
date: 2019-07-26 03:14:45
category: Tech
tags: [Python, flask, LINE Bot]
---

LINE Messaging API + line-bot-sdk によるPythonでのチャットボット作成と，同等機能をもつWebアプリケーションを同時に作成し，herokuへデプロイ，継続的インテグレーションでmasterへのpushで自動デプロイさせました。

<!-- more  -->

コードの詳細等はそもそも[ゴー☆ジャスをつくる](https://qiita.com/jg43yr/items/30defcdb69163612fc27)をLINE BotとWebアプリ化したリポジトリがあるので，そちらを参照すること。

<blockquote class="embedly-card"><h4><a href="https://github.com/atsukoba/GorgeousApp">atsukoba/GorgeousApp</a></h4><p>キミのハートに、レボ☆リューション！. Contribute to atsukoba/GorgeousApp development by creating an account on GitHub.</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

[Webアプリ](https://gorgeous-app.herokuapp.com/)

## herokuの下準備

まず，テキスト処理系のモノをherokuにデプロイするならば`MeCab`+`mecab-python`等の形態素解析器を入れたい。ので，buildpackを複数入れられる`heroku-buildpack-multi`を選択し，pythonとlinuxbrewのbuildpackを入れることでMeCab等の`brew install`を可能にする

まずheroku cli。

```shell
brew tap heroku/brew && brew install heroku
heroku create --buildpack https://github.com/heroku/heroku-buildpack-multi
```

`.buildpack`へは以下を

```.buildpack
https://github.com/heroku/heroku-buildpack-python.git
https://github.com/sunny4381/heroku-buildpack-linuxbrew.git
```

linuxbrew用の`.celler`に

```.celler
mecab
mecab-ipadic
```

と書いておき，`requirements.txt`も適切にかけば環境が整う。

以下を参照すると良い。(sklearnを動かすためにbuildpack-multiでcondaを入れている)

[herokuでpython+django+scikit-learn+mecab(1)](https://qiita.com/kenchin110100/items/6f1c84ac8858525fffc5)

## LINE Developers / Messaging API の設定

![screenshot](https://i.gyazo.com/bfb34348c18382476989e734c3106351.png)

各種アクセストークン等取得しておく。
以下が多分文字通りわかりやすい。

[LINE BOTの作り方を世界一わかりやすく解説（１）【アカウント準備編】](https://qiita.com/yoshizaki_kkgk/items/bd4277d3943200beab26)

## flaskでAPIを書く

LINE bot用のテンプレート ([app.py](https://github.com/line/line-bot-sdk-python/blob/master/examples/flask-kitchensink/app.py)) があり，それを使う。そこでは`/callback`への`POST`に対して返答を行うので，それに加えて，最低限ルートへの`GET`, `POST`の処理を書いておく。(`flask.render_template()`でテンプレートHTMLを返すようにしておく)  

ここで，テキスト処理用のモジュールを読んでおいて，`POST`で入力されたテキストに対しての返答を`JSON`で受け取り，`jinja2`で扱えるように`render_template`に渡してあげる。

`linebot.LineBotAPI`と`linebot.WebhookHandler`のインスタンス化に必要な`CHANNEL_ACCESS_TOKEN`と`CHANNEL_SECRET`は環境変数に入れておき，`os.environ.get`で取得する。heroku上では管理画面から登録し，ローカルでのテストではテキトーに何か入れておく。

`app.run(debug=True)`でAPIのテストをする。

## Jinja2を書く

テキスト処理なので，最低限入力ボックスと出力結果のUIはほしい。ので，HTMLとCSSを書く。`flask`のappと同階層に`template/`を作成し，そこにhtmlを書いていく。

普通に

```html
<form action="/" method="POST">
    <input type="text" name="input"/>
</form>
```

のように記入すれば`POST`できるし，`Jinja`内では，2重ブラケット内で

```html
<div id="data">
    {{ data["key] }}
</div>
```

`render_template()`内に渡されたキーワード変数がそのまま辞書としてアクセスできる。

ただ，二重ブラケット内で素のPythonが書けるわけではない(とくにループやデータのキャストとか)ので，以下等を参照すると良い。

[pythonのためのテンプレートエンジン「Jinja2」便利な機能](https://qiita.com/kotamatsuoka/items/a95faf6655c0e775ee22)

`templates/`と同階層に`static/`を作成しておけば，そこにcssやjsを書いてフロントをすこしいじれる。私はここで`sass/`内にsassを書き，`css/style.css`へコンパイルすることで，

```html
<link rel="stylesheet" href="/static/css/style.css">
```

のようにいつもどおりheadから読んで使っている。

## herokuとGitHubの連携

herokuで動かすために，`Procfile`を書く。  
wsgiとして`gunicorn`を用いるのが楽で，ポピュラーというかflaskだと必須か。
process typeは`web`に設定し，gunicornを起動する。

`web: gunicorn app.app:app --log-file=-`

アプリケーションのインスタンス`flask.Flask`を指定してあげる。  
`アプリケーションモジュール:アプリケーションインスタンス/関数`という指定方法。

[Gunicorn - Python WSGI HTTP Server for UNIX](https://gunicorn.org/)

![ss](https://i.gyazo.com/75a46844773d4bddcae040fac45bff17.png)

その後はGitHub上にリモートレポジトリを作成し，herokuのダッシュボード上で認証・連携をする。この時にGUIで`config vars`からLINEから発行されたアクセストークン等を登録できる。

あとは，普通にgit pushすれば，デプロイが走る。  
デプロイ中のログに加えPythonから`logging`や`print`で出力した内容もダッシュボードのログから確認できるため，そこで逐一チェックすればまあ動くものは作れるはず。
