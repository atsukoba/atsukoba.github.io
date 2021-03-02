---
title: 'pykakasi, mecab-python3等のメモ。'
description: 'pykakasi, mecab-python3等のメモ。'
slug: pykakasi-mecab-python
date: 2019-07-15 04:54:40
category: 'Tech Blog'
tags: [Python, Qiita]
keyVisual: https://i.gyazo.com/1b67640d65d11ebc36655c0296b6286e.png
---

## packages

- requirements.txt

```txt
pykakasi==1.0
mecab-python3==0.7
python-Levenshtein==0.12.0
```

---

## pykakasi

- usage

`H`が hiragana, `K`が katakana, `A`が alphabet

```python
import pykakasi.kakasi as kakasi

kakasi = kakasi()
kakasi.setMode("H","a") # default: Hiragana -> Roman
kakasi.setMode("K","a") # default: Katakana -> Roman
kakasi.setMode("J","a") # default: Japanese -> Roman
kakasi.setMode("r","Hepburn") # default: use Hepburn Roman table
kakasi.setMode("s", True) # default: Separator
kakasi.setMode("C", True) # default: Capitalize
conv = kakasi.getConverter()  # instantiate Converter
result = conv.do(text)  # romanize
```

---

## mecab-python

[MeCab](https://taku910.github.io/mecab/)の Python ラッパ。

### MeCab on docker

- Dockerfile

```Dockerfile
RUN apt-get update \
    && apt-get install -y mecab \
    && apt-get install -y libmecab-dev \
    && apt-get install -y mecab-ipadic-utf8\
    && apt-get install -y git\
    && apt-get install -y make\
    && apt-get install -y curl\
    && apt-get install -y xz-utils\
    && apt-get install -y file\
    && apt-get install -y sudo\
    && apt-get install -y wget

RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git\
    && cd mecab-ipadic-neologd\
    && bin/install-mecab-ipadic-neologd -n -y

RUN apt-get install -y software-properties-common vim
RUN add-apt-repository ppa:jonathonf/python-3.6
RUN apt-get update

RUN apt-get install -y build-essential python3.6 python3.6-dev python3-pip python3.6-venv
RUN python3.6 -m pip install pip --upgrade
RUN pip install mecab-python3
```

- 出力のフォーマット

`表層形\t品詞,品詞細分類1,品詞細分類2,品詞細分類3,活用型,活用形,原形,読み,発音`

#### 出力結果処理

```python 入力文
import MeCab
text = "慶應義塾大学湘南藤沢キャンパス"
T = MeCab.Tagger("")
```

- 表層系 + その他情報のタプル

```python
parsed = [[l.split('\t')[0], tuple(l.split('\t')[1].split(','))] for l in T.parse(text).splitlines()[:-1]]
```

```python 結果
[['慶應義塾', ('名詞', '固有名詞', '組織', '*', '*', '*', '慶應義塾', 'ケイオウギジュク', 'ケイオーギジュク')],
 ['大学', ('名詞', '一般', '*', '*', '*', '*', '大学', 'ダイガク', 'ダイガク')],
 ['湘南', ('名詞', '固有名詞', '地域', '一般', '*', '*', '湘南', 'ショウナン', 'ショーナン')],
 ['藤沢', ('名詞', '固有名詞', '地域', '一般', '*', '*', '藤沢', 'フジサワ', 'フジサワ')],
 ['キャンパス', ('名詞', '一般', '*', '*', '*', '*', 'キャンパス', 'キャンパス', 'キャンパス')]]
```

- 全情報のタプル

`re`で一気に分ける

```python
import re
parsed = [tuple(re.split(r"[\t,]", l)) for l in T.parse(text).splitlines()[:-1]]
```

```python 結果
[('慶應義塾', '名詞', '固有名詞', '組織', '*', '*', '*', '慶應義塾', 'ケイオウギジュク', 'ケイオーギジュク'),
 ('大学', '名詞', '一般', '*', '*', '*', '*', '大学', 'ダイガク', 'ダイガク'),
 ('湘南', '名詞', '固有名詞', '地域', '一般', '*', '*', '湘南', 'ショウナン', 'ショーナン'),
 ('藤沢', '名詞', '固有名詞', '地域', '一般', '*', '*', '藤沢', 'フジサワ', 'フジサワ'),
 ('キャンパス', '名詞', '一般', '*', '*', '*', '*', 'キャンパス', 'キャンパス', 'キャンパス')]
```

#### MeCab: 分かち書き

```python
import MeCab
wakati = MeCab.Tagger("-Owakati")
wakati.parse("慶應義塾大学湘南藤沢キャンパス").split()
```

#### Chasen スタイル

```python
chasen = MeCab.Tagger("-Ochasen")
print(chasen.parse("pythonが大好きです"))
```

```text
python　python　　python　名詞-固有名詞-組織
が　　　ガ　　　　が　　　助詞-格助詞-一般
大好き　ダイスキ　大好き　名詞-形容動詞語幹
です　　デス　　　です　　助動詞　特殊・デス　基本形
EOS
```

#### その他

- `-Oyomi`オプションで読みの出力。ただ分かち書きがされない。
