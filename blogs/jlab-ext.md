---
description: ""
title: Jupyter Lab の Extensionメモ
slug: jlab-ext
date: 2019-04-19 05:07:47
category: "Tech Blog"
tags: [Python, Jupyter Lab]
---

Jupyter Labの拡張機能メモ

<!-- more -->

## Git

```bash
jupyter labextension install @jupyterlab/git
pip install -e git+https://github.com/SwissDataScienceCenter/jupyterlab-git.git@fix-git-current-dir#egg=jupyterlab_git
jupyter serverextension enable --py jupyterlab_git
```

## Var Inspector

```bash
jupyter labextension install @lckr/jupyterlab_variableinspector
```

## ToC

```bash
jupyter labextension install @jupyterlab/toc
pip install jupyterlab_code_formatter
jupyter labextension install @ryantam626/jupyterlab_code_formatter
jupyter serverextension enable --py jupyterlab_code_formatter
```

## autoPEP8

```bash
pip install autopep8

```
