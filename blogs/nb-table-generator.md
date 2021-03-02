---
title: '複数の.ipynb をまとめて目次生成'
description: '自身のGitHub上で自身の学習記録やボイラープレートをカンペ集として残している([リポジトリ](https://github.com/atsukoba/cheatbooks))のですが，同じディレクトリ直下に複数のノートブックを保存しています。で，その各ノートブック内のMarkdownに記述されている部分を抽出するスクリプトを書きました。'
slug: nb-table-generator
date: 2019-02-16 23:01:27
category: 'Tech Blog'
tags: [Python, Jupyter]
keyVisual: https://i.gyazo.com/8200e850ac205df84fd106d9c6d82e38.png
---

自身の GitHub 上で自身の学習記録やボイラープレートをカンペ集として残している([リポジトリ](https://github.com/atsukoba/cheatbooks))のですが，同じディレクトリ直下に複数のノートブックを保存しています。で，その各ノートブック内の Markdown に記述されている部分を抽出するスクリプトを書きました。

### Usage

```shell
% python nb_table_generator.py
```

or

```python
import nb_table_generator

nb_table_generator.main(file_name="output_file_name")
```

### src

<script src="https://gist.github.com/atsukoba/b284847b58c5d4598580dfe9539669e2.js"></script>
