---
description: ""
title: "Jupyter NotebookのCustom CSS"
slug: jupyterstyle
date: 2019-04-24 10:33:59
category: "Tech Blog"
tags: [CSS, Jupyter]
keyVisual: https://i.gyazo.com/5567d5a7d74c2989ba069c3563b6061a.png
---

Jupyter Notebookでは`~/.jupyter/custom/custom.css`にCSSを記述すれば自由にスタイルを変えられる。テーマを変更するのではなく，自前でCSSを書く。  
例えば[あなたの生産性を向上させるJupyter notebook Tips](https://recruit-tech.co.jp/blog/2018/10/16/jupyter_notebook_tips/#b24)では，シンタックスハイライトまで変更している。

<!-- more -->

例えば，以下のCSSを当てると

<script src="https://gist.github.com/atsukoba/beb7ec3fd1927dacf2f6df4b0f209f22.js"></script>

### Before

![before style](https://i.gyazo.com/975ecbdd77872c8792108ed679284c91.png)

### After

![after style](https://i.gyazo.com/5567d5a7d74c2989ba069c3563b6061a.png)

きゃー便利。`animate.css`とかで無駄なパララックスを実装して遊んでも良さそうだ。ただJupyter Labはマークアップの構造がそもそもかなり違うため，流用はでき無さそう。

