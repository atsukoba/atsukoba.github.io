---
slug: coding-blog
title: Doc2VecとOptunaを使ったSVMでのテキスト分類を作ってみた
description: Optunaを使ってみる練習として，Doc2Vecを用いてテキスト分類をするやつをサクっと書きました。
author: Imran Irshad
tag: 技術
keyVisual: shonandai.jpg
date: 2019/02/15
---

出力はモデルの accuracy，F1 と，`pyplot`での Confusion Matrix を出力します。

ラベルデータを下記の形で用意します

| DOCUMENT_FILE_NAME(id) | LABEL(labels) |
| :--------------------: | :-----------: |
|        foo.txt         |      bar      |
|        bar.txt         |      foo      |

使い方は，`% python document_SVClassifier.py -h`で。

各テキストデータ毎に分類を行います。

### Source ([github](https://gist.github.com/atsukoba/b33967dee47e92f58240a3a544d0650b))

```python
# Author: Atsuya Kobayashi @atsuya_kobayashi
# 2019/02/15 17:20

"""Support Vector Document Classifier with doc2vec & Optuna
- .csv label file must be in the form of following style
|DOCUMENT_FILE_NAME(id)|LABEL(labels)|
|----------------------|-------------|
|       foo.txt        |     bar     |
|       bar.txt        |     foo     |
"""

import argparse
import itertools
import optuna
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from tqdm import tqdm
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from gensim.models import Doc2Vec
from sklearn.metrics import confusion_matrix, accuracy_score, f1_score

# parameters
PATH_TO_CSVFILE = ""
TEXTFILE_TARGET_DIR = "/"
PATH_TO_PRETRAINED_DOC2VEC_MODEL = ""
N_OPTIMIZE_TRIAL = 20
USE_MORPH_TOKENIZER = False

def plot_confusion_matrix(cm, classes, normalize=False,
                          title='Confusion matrix', cmap=plt.cm.Blues):
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    print(cm)

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.ylabel('True label')
    plt.xlabel('Predicted label')
    plt.tight_layout()
    return


# for Optuna
def obj(trial):
    # C
    svc_c = trial.suggest_loguniform('C', 1e0, 1e2)
    # kernel
    kernel = trial.suggest_categorical('kernel', ['linear', 'poly', 'rbf'])
    # SVC
    clf = SVC(C=svc_c, kernel=kernel)
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    # 3-fold cross validation
    score = cross_val_score(clf, X_train, y_train, n_jobs=-1, cv=3)
    accuracy = score.mean()
    return 1.0 - accuracy


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Train a Support Vector Sentence Classifier')
    parser.add_argument('csv', help='PATH TO CSVFILE')
    parser.add_argument('dir', help='TEXTFILE TARGET DIRECTORY')
    parser.add_argument('model', help='PATH TO PRETRAINED DOC2VEC MODEL FILE')
    parser.add_argument("-N", "--n_trial", dest='n', default=20, type=int,
                        help='N OF OPTIMIZE TRIALS (Default is 20times)')
    parser.add_argument("-M", "--mecab", dest='mecab', action='store_true',
                        help='USE MECAB Owakati TAGGER')
    args = parser.parse_args()
    PATH_TO_CSVFILE = args.csv
    TEXTFILE_TARGET_DIR = args.dir
    PATH_TO_PRETRAINED_DOC2VEC_MODEL = args.model
    N_OPTIMIZE_TRIAL = args.n
    USE_MORPH_TOKENIZER = args.mecab

    m = MeCab.Tagger("-Owakati")
    df = pd.read_csv(PATH_TO_CSVFILE)

    documents = []
    for fname in tqdm(df.id, desc="Reading Files"):
        with open(TEXTFILE_TARGET_DIR + fname) as f:
            if USE_MORPH_TOKENIZER:
                doc = m.parse(f.read()).strip().split()
            else:
                doc = f.read().strip().split()
        documents.append(doc)

    model = Doc2Vec.load(PATH_TO_PRETRAINED_DOC2VEC_MODEL)
    document_vectors = [model.infer_vector(s) for s in tqdm(documents)]

    X_train, X_test, y_train, y_test = train_test_split(document_vectors, df.labels,
                                                        test_size=0.5, random_state=42)

    study = optuna.create_study()
    study.optimize(obj, n_trials=N_OPTIMIZE_TRIAL)
    # fits a model with best params
    clf = SVC(C=study.best_params["C"], kernel=study.best_params["kernel"])
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    # Compute confusion matrix
    cnf_matrix = confusion_matrix(y_test, y_pred)
    np.set_printoptions(precision=2)
    # Plot non-normalized confusion matrix
    plt.figure()
    plot_confusion_matrix(cnf_matrix, classes=data.categories,
                          title='Confusion matrix, without normalization')
    plt.show()
    # print result
    print(f"Acc = {accuracy_score(y_test, y_pred)}")
    print(f"F1 = {f1_score(y_test, y_pred, average='weighted')}")
```
