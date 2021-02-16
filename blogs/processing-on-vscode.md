---
title: Processingのvscode開発環境を構築(Mac)
slug: processing-on-vscode
date: 2019-08-25 07:16:23
category: Tech
tags: [Processing, Visual Studio Code]
---

ProcessingのIDEが非常にイヤなので，まずは[Qiita: ProcessingをVisual Studio Codeで動かしたい](https://qiita.com/jacynthe/items/d31eaa77496295c10556)を参照し設定する。しかしこの記事のやり方だと，1スケッチ毎に`.vscode`による設定をしなければならずイヤなので，例えば[Processingでゼロから学ぶプログラミング・ビジュアルアートの公式リポジトリ](https://github.com/cocopon/zero-pde)なんかをcloneしてきて試す時に，プロジェクトフォルダに内包されている複数のスケッチを即時実行できるように改良したメモです。

<!-- more -->

## 準備

まずは上述の[Qiita記事](https://qiita.com/jacynthe/items/d31eaa77496295c10556)通りにセッティングを行う。そしたらProcessingのインストール。ラクなので`Homebrew`を使う。

### install.sh

```shell
# homebrew
if !(type "brew" > /dev/null 2>&1); then
    echo "install HomeBrew..."
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null ; brew install caskroom/cask/brew-cask 2> /dev/null

else
    echo "Homebrew is already installed"
fi

if !(type "processing-java" > /dev/null 2>&1); then
    brew tap caskroom/cask
    brew install brew-cask
    echo "installing Processing via Homebrew..."
    brew cask install -v processing

    echo "Open Processing and install processing-java (from menu bar > Tools > install processing-java)"
    echo "input path to Processing.app: "
    read pjpath
    echo "adding path"
    sudo ln -s ${pjpath}/processing-java /usr/local/bin/
else
    pjpath=$(which processing-java)
    echo "processing-java is already installed : ${pjpath}"
fi

echo "add path to vscode setting (tasks.json)"
sed -i -e "s|\"command\":.*|\"command\": \"${pjpath}\",|g" .vscode/tasks.json
```

そして，生成・編集された`tasks.json`の`"args"`の`"--sketch"`部分を，[visualstudio.com: Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)を頼りに編集する。

### .vscode/tasks.json

```json
"--sketch=${workspaceRoot}/${relativeFileDirname}"
```

これによりスケッチフォルダのパスがちゃんと渡される。

### Variable Reference

```txt
${workspaceFolder} - the path of the folder opened in VS Code
${workspaceFolderBasename} - the name of the folder opened in VS Code without any slashes (/)
${file} - the current opened file
${relativeFile} - the current opened file relative to workspaceFolder
${relativeFileDirname} - the current opened file's dirname relative to workspaceFolder
${fileBasename} - the current opened file's basename
${fileBasenameNoExtension} - the current opened file's basename with no file extension
${fileDirname} - the current opened file's dirname
${fileExtname} - the current opened file's extension
${cwd} - the task runner's current working directory on startup
${lineNumber} - the current selected line number in the active file
${selectedText} - the current selected text in the active file
${execPath} - the path to the running VS Code executable
```

これにより，プロジェクトフォルダ直下の`.pde`でなくても，`Command + Shift + B`で実行できる。ウレシイ。

ここで，試しに`git submodule add git@github.com:cocopon/zero-pde.git`をして，Processingでゼロから学ぶプログラミング・ビジュアルアートを試す等すると良いかも。
