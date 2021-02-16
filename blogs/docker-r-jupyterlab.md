---
title: DockerでRstanが使えるJupyterLabのサーバーを建てる
slug: docker-r-jupyterlab
date: 2019-07-22 11:23:52
category: Tech
tags: [Docker, R, Jupyter Lab]
---

Rstanの環境構築でコケるので。

<!-- more -->

## Dockerfile

```Dockerfile
FROM jupyter/datascience-notebook

RUN pip install jupyterlab
RUN jupyter serverextension enable --py jupyterlab
RUN jupyter labextension install @jupyterlab/git
RUN pip install jupyterlab-git
RUN jupyter serverextension enable --py jupyterlab_git

FROM rocker/tidyverse

# Change environment to Japanese(Character and DateTime)
ENV LANG ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8
RUN sed -i '$d' /etc/locale.gen \
  && echo "ja_JP.UTF-8 UTF-8" >> /etc/locale.gen \
  && locale-gen ja_JP.UTF-8 \
  && /usr/sbin/update-locale LANG=ja_JP.UTF-8 LANGUAGE="ja_JP:ja"
RUN /bin/bash -c "source /etc/default/locale"
RUN ln -sf  /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# Install Japanese fonts
RUN apt-get update && apt-get install -y \
  fonts-ipaexfont

# Install packages
RUN Rscript -e "install.packages(c('githubinstall','rstan','ggmcmc','bayesplot','brms'))"

RUN jupyter lab --no-browser --port=8888

```

## References

- [dockerhub:kazutan/stan-d](https://hub.docker.com/r/kazutan/stan-d/)
- [dockerhub:jupyter/datascience-notebook](https://hub.docker.com/r/jupyter/datascience-notebook/)
- [Qiita:DockerでJupyterLabを構築する](https://qiita.com/muk-ai/items/a147cfd2cafc57420b15)
- [Qiita:Dockerを利用してRStudio ServerでRStan環境を準備する](https://qiita.com/kazutan/items/f1447cbabed8d4dd50b8)
