---
title: JupyterLabのExtensionメモ
description: 'Jupyter Labの拡張機能メモ'
slug: jlab-ext
date: 2019-04-19 05:07:47
category: 'Tech Blog'
tags: [Jupyter]
keyVisual: https://i.gyazo.com/6d52df1f28b5f067804814ac8216f645.png
---

Jupyter Lab の拡張機能メモ

[Extensions — JupyterLab 3.0.6 documentation](https://jupyterlab.readthedocs.io/en/stable/user/extensions.html)

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
