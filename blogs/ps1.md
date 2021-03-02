---
description: ""
title: "bashプロンプトメモ"
slug: ps1
date: 2019-04-29 00:00:53
category: "Tech Blog"
tags: [shellscript, bash]
---

Git のブランチをプロンプトに表示したかったので，[プロンプトをカスタマイズして git ブランチを表示する](https://qiita.com/caad1229/items/6d71d84933c8a87af0c4)をもとに，`~/.bashrc`の`PS1`(The primary prompt string) を変更したのでメモ。

---

<script src="https://gist.github.com/atsukoba/369f8afa9bde30ceafce2d4f3b087a2c.js"></script>

以上を設定し，

![my prompt](https://i.gyazo.com/1aa55461979ca2a5e392e0bf6be39425.png)

こうなった。

---

## 備忘録

[2.5. Bash Prompt Escape Sequences](http://tldp.org/HOWTO/Bash-Prompt-HOWTO/bash-prompt-escape-sequences.html)によると，以下の通り。

- `\h` => ホスト名
- `\u` => ユーザ名
- `\w` => ディレクトリ（フルパス）
- `\W` => ディレクトリ
- `\t` => 時間 (24 形式)
- `\T` => 時間 (12 形式)
- `\@` => AM / PM
- `\d` => 日付
- `\D` => 日時
- `\#` => コマンド番号
- `\!` => ヒストリ番号
- `\n` => 改行

表示としては，

```bash
[<コマンド番号>(<ヒストリ番号>)] <時間 HH:MM:SS> <user> at <directory> [<branch>]
```

となる。

`<branch>`の部分では，`parse_guit_branch`を呼んでいて，その内部がでは`git branch --no-color`の結果を`sed`で置換，エラー(`2`)を[`/dev/null`](https://ja.wikipedia.org/wiki//dev/null)へ捨てている。

また，上記記事にもあるが，色設定として以下の変数化も使える

```shellscript
local  BLUE="\[\e[1;34m\]"
local  RED="\[\e[1;31m\]"
local  GREEN="\[\e[1;32m\]"
local  WHITE="\[\e[00m\]"
local  GRAY="\[\e[1;37m\]"
```

---

### ちなみに

`PS2`(The secondary prompt string)も設定できるみたいだが面倒なので放置。
