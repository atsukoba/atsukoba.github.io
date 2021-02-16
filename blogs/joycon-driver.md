---
title: 任天堂Switchのジョイコンを楽器にする
slug: joycon-driver
date: 2020-01-26 03:40:48
category: Tech
tags: [Python, Max/MSP]
---

Bluetooth接続したJoy-Conからhid経由で情報取得するPythonライブラリ`joycon-python`の開発に参加し，その`joycon-python`を用いて信号をOSC (Open Sound Control)に飛ばすスクリプト`joycon-osc`を作成し，その`joycon-osc`を用いて送信した情報をMaxで受け取って音にしました。

<!-- more -->

こんなものです。

<div style="margin:0 auto;width:fit-content;">
<blockquote class="twitter-tweet" data-lang="en" data-dnt="true" data-theme="dark"><p lang="ja" dir="ltr"><a href="https://t.co/hjYsuvJFMd">pic.twitter.com/hjYsuvJFMd</a></p>&mdash; atsuya kobayashi (@atsuyakoba) <a href="https://twitter.com/atsuyakoba/status/1221912455019782144?ref_src=twsrc%5Etfw">January 27, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

## joy-con to Python

こう言うと人に驚かれるのだが，僕は任天堂Switchを持っていないのに任天堂Switchのコントローラーであるジョイコンを持っています。なぜならジョイコンだけ買った(買わされた)から。

ということで，ジョイコンをmacにつなげて何か遊べないかと考えていたときに，[Qiita: Joy-ConにPythonからBluetooth接続をして6軸センサーと入力情報を取得する](https://qiita.com/tokoroten-lab/items/9a5d81c8f640ecaff7a9#comment-a6875db57d685403e37f)という記事を発見。すぐさま著者が公開していたリポジトリを訪問し，forkし，パッケージ化し，PRを出した（らめっちゃ丁寧なコードレビューをしてもらい感動した）。それが以下のリポジトリ。

<blockquote class="embedly-card"><h4><a href="https://github.com/tokoroten-lab/joycon-python">tokoroten-lab/joycon-python</a></h4><p>driver for Joy-Con (Nintendo Switch). Contribute to tokoroten-lab/joycon-python development by creating an account on GitHub.</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

今ではPyPiへの公開もされており，`pip install joycon-python`で使える。

## joy-con to osc

次に，ジョイコンの状態を監視してOSCを送るスクリプトを作成した。それも以下のリポジトリとして公開している。

<blockquote class="embedly-card"><h4><a href="https://github.com/atsukoba/joycon-osc">atsukoba/joycon-osc</a></h4><p>Send OSC (Open Sound Control) by Joy-Con (Nintendo Switch). Contribute to atsukoba/joycon-osc development by creating an account on GitHub.</p></blockquote>

## joy-con to Max/MSP

OSCを飛ばす準備をしたら，あとはMax上で受け取って音にする。

<div style="margin:0 auto;width:fit-content;">
<blockquote class="twitter-tweet" data-conversation="none" data-theme="dark"><p lang="und" dir="ltr"><a href="https://t.co/iW8arvdzSw">pic.twitter.com/iW8arvdzSw</a></p>&mdash; atsuya kobayashi (@atsuyakoba) <a href="https://twitter.com/atsuyakoba/status/1220526326647386112?ref_src=twsrc%5Etfw">January 24, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
