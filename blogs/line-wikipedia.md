---
title: Wikipediaから検索するLINE botを作った
slug: line-wikipedia
date: 2019-05-04 00:26:20
category: Tech
tags: [Python, LINE Bot]
---

`flask`, `line-bot-sdk` と `wikipedia`で作って，`heroku`にデプロイします。

<a href="http://nav.cx/9xRAMW8" >ぜひ使って下さい。</a><a href="http://nav.cx/9xRAMW8" style="width: 120px;height: 35px;display: inline-block;border-radius: 10px;background-image: url(https://scdn.line-apps.com/n/line_add_friends/btn/ja.png);background-size: cover;">
</a>

<!-- more -->

---

## 完成図

![screenshot](https://repository-images.githubusercontent.com/184452650/ee9d3b80-6cab-11e9-9261-01e61f18fa3c)

レポジトリは[こちら](https://github.com/atsukoba/Wikipedia-LINEbot)

---

## 準備

`pip install -r requirements.txt`させたいので，上記３つを requirements.txt へ記述し，heroku の設定と LINE@の設定を終わらせておく (アクセストークンとチャンネルシークレットあたりを入手しておく)。`runtime.txt`と`procfile`を置く。基本[Heroku で LINE BOT(python)を動かしてみた](https://qiita.com/akabei/items/38f974716f194afea4a5)を真似た。

---

## Wikipedia について

みんなだいすき Wikipedia。

```bash
pip instal wikipedia
```

で入るライブラリである[Wikipedia](https://pypi.org/project/wikipedia/)は非常に便利で，Python 用の[Media Wiki API](https://ja.wikipedia.org/w/api.php)のラッパーだと解釈している。`requests`で API 叩いて，`BeautifulSoup4`か何かでマークアップをバラして，返してくれるものだったはず。

```python
import wikipedia

wikipedia.set_lang("ja")
```

で日本語 Wikipedia に設定した後，

```python
wikipedia.search("文字列")
```

をすることで各`ページ名`のリストが返り，書く Wikipedia のページはその名前(タイトル)が ID となっており，

```python
wikipedia.page("ページ名")
```

で`wikipedia.WikipediaPage`オブジェクトを取得できる。この page オブジェクトが`categories`, `links`, `content`, `summary`などの attributes をもっており，これらは基本的に URL か文字列かのリストである。

```python
>>> help(wikipedia.WikipediaPage)
>>>
"""
categories
    List of categories of a page.
content
    Plain text content of the page, excluding images, tables, and other data.
coordinates
    Tuple of Decimals in the form of (lat, lon) or None
images
    List of URLs of images on the page.
links
    List of titles of Wikipedia page links on a page.
    Only includes articles from namespace 0, meaning no Category, User talk, or other meta-Wikipedia pages.
parent_id
    Revision ID of the parent version of the current revision of this
    page. See ``revision_id`` for more information.
references
    List of URLs of external links on a page.
    May include external links within page that aren't technically cited anywhere.
revision_id
    Revision ID of the page.
    The revision ID is a number that uniquely identifies the current
"""
```

今回つくる LINE Bot では，検索単語に対して取得した候補の中から 1 ページ選び，そのページの summary (タイトル直後の概要・OGP とかに表示される?)とページへのリンクを LINE トークルームにかえしてあげよう，というものを作ることにした。

---

## ファイルとか

```
.
├── Procfile
├── README.md
├── __pycache__
│   ├── app.cpython-36.pyc
│   └── parser.cpython-36.pyc
├── app.py
├── assets
│   └── img
│       └── linebot-icon.png
├── messenger.py
├── parser.py
├── requirements.txt
├── runtime.txt
└── test.py
```

---

## `app.py`

次に，`flask`ベースでアプリケーション部分をササっと書きますが，これもほぼコピペ。面倒な部分を`linebot`が隠してくれていて，非常に便利。

```python
from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)

import parser
import os

app = Flask(__name__)

YOUR_CHANNEL_ACCESS_TOKEN = os.environ.get("YOUR_CHANNEL_ACCESS_TOKEN")
YOUR_CHANNEL_SECRET = os.environ.get("YOUR_CHANNEL_SECRET")

line_bot_api = LineBotApi(YOUR_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(YOUR_CHANNEL_SECRET)


@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=parser.answer(event.message.text)))


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
```

line-bot-sdk-python の公式リポジトリに，`app.py`として flask でのサンプルが公開されている。
[[sample] app.py](https://github.com/line/line-bot-sdk-python/blob/master/examples/flask-echo/app.py)

また，今回はそもそも README にガッツリ載っていたものを使った。[sample code on GitHub](https://github.com/line/line-bot-sdk-python/blob/master/README.rst)

---

### `parser.py`

parser はモジュールの変数として言語設定を持っている。設計として微妙ですかね？モジュール(グローバル)変数は。  
なんか使い方間違えたりとか，ヘルプ出したい時のための`usage()`は未実装。  
意外と`WikipediaPage.summary`の文字数が長く，Messaging API の上限を叩いてしまったときのために，1500 文字以上は切っている。

```python
import wikipedia


# init language setting
lang = "ja"
wikipedia.set_lang(lang)

def init() -> None:
    global lang
    wikipedia.set_lang(lang)


def tokenize(text: str) -> list:
    """Tokenize input Sentence to list of word"""
    splited = text.split()
    if len(splited) == 1:
        return splited
    elif len(splited) == 2:
        if splited[0] in wikipedia.languages.fn().keys():
            change_lang(splited[0])
        return splited[1]
    else:
        usage()

def search(text: str, rank=0) -> "wikipedia.wikipedia.WikipediaPage":
    """Search Wikipedia page by Word
    arg
    ---
    rank : int : Return the contents of the search result of the set rank.
    """
    try:
        page = wikipedia.page(wikipedia.search(text)[rank])
    except wikipedia.exceptions.DisambiguationError:
        page = wikipedia.page(wikipedia.search(text)[rank+1])
    return page


def encode(page: "wikipedia.wikipedia.WikipediaPage", threshold=1500) -> str:
    """Transform data into the text for LINE message
    """
    summary = page.summary
    if len(summary) > threshold:
        summary = summary[:threshold] + "..."

    return f"Result: {page.title}\n\n{summary}\n\n{page.url}"


def answer(text: str) -> str:
    init()
    word = tokenize(text)
    page = search(word)
    return encode(page)


def change_lang(language: str) -> None:
    wikipedia.set_lang(language)
    return

def usage():
    pass

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.parse_args()
```

一応ちゃんと**PEP8**スタイルだし，type hints も docstring 書いている。クセにしとおきたい。

---

### デプロイ等

```bash
$ heroku login
$ heroku create heroku-line-bot
$ heroku config:set LINE_CHANNEL_SECRET="<Channel Secret>"
$ heroku config:set LINE_CHANNEL_ACCESS_TOKEN="<アクセストークン>"
$ git push heroku master
```

---

### references

- [LINE Messaging API SDK for Python - GitHub](https://github.com/line/line-bot-sdk-python)
- [Python で Line bot を作ってみた - Qiita](https://qiita.com/kro/items/67f7510b36945eb9689b)
- [Messaging API SDK - LINE Developers](https://developers.line.biz/ja/docs/messaging-api/line-bot-sdk/)
- [Heroku でサンプルボットを作成する - LINE Developers](https://developers.line.biz/ja/docs/messaging-api/building-sample-bot-with-heroku/)
- [heroku に Flask アプリをデプロイする - Qiita](https://qiita.com/msrks/items/c57e0168fb89f160d488)
