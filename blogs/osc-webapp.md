---
title: 'nodejsでローカルにoscを送るwebアプリケーションを作る (SocketIO, Express)'
description: '誰でもoscを通して作品に参加できるようなwebアプリケーションをプロトタイピングしました。'
slug: osc-webapp
date: 2019-10-08 17:50:42
category: 'Tech Blog'
tags: [Open Sound Control, nodejs, express]
keyVisual: https://i.gyazo.com/0ec1a0958d7e3a96e45e0503ca9497ad.png
---

誰でも osc を通して作品に参加できるような web アプリケーションをプロトタイピングしました。[リポジトリ]("https://github.com/atsukoba/osc-webapp")。

## OSC (Open Sound Control)

OSC とは: [opensoundcontrol.org](http://opensoundcontrol.org/) や[wikipedia](https://ja.wikipedia.org/wiki/OpenSound_Control)を参照。

yoppa.org の[openFramewoks – OSC (Open Sound Control) を利用したネットワーク連携](https://yoppa.org/ma2_10/2279.html)が非常にためになる。

UDP 上で MIDI みたいなものを Max/MSP に送ったりできるので非常に便利。今回はこいつを LAN 上だけならずインターネット上のスマートフォンからローカルに受け付ける，展示をよりインタラクティブにするためのツールのプロトタイピングを行う。

(以下リポジトリを参照していただければローカルでアプリケーション動かせます）

<blockquote class="embedly-card"><h4><a href="https://github.com/atsukoba/osc-webapp">atsukoba/osc-webapp</a></h4><p>Serve OSC from www. Contribute to atsukoba/osc-webapp development by creating an account on GitHub.</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

## 概観

nodejs/express でサーバを立てて，軽くて双方向に使える websocket でユーザのアプリケーション上での動きを捉える。localhost に立てたサーバを ngrok で公開し，その URL(とローカルの IP アドレス)を QR コードに出力するところまでを実装する。

軽くフロントを書いてデモをつくり，簡単なボタンとそのボタンに対応したメッセージをローカルの osc に送れるかを確認する。

![alt](/images/works/osc-webapp.png 'デモのスクリーンショット')

### express

```shell
npm install express-generator -g
express --view=ejs osc-webapp
cd osc-webapp
npm install
```

`socket.io`を使用する。

```javascript
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
```

### osc

`node-osc`([npm: node-osc](https://www.npmjs.com/package/node-osc))を利用する。利用例としては以下のような感じ

```javascript
const osc_portnum = 5050
const client = new osc.Client('127.0.0.1', osc_portnum)

io.of('osc').on('connection', (socket) => {
  socket.on('message', (obj) => {
    console.log('osc: ' + obj)
    obj = JSON.parse(obj)
    let sendObj = new osc.Message(obj.address)
    sendObj.append(obj.args)
    client.send(sendObj)
    let dt = new Date()
    io.of('osc').send(
      `${dt.toFormat('HH24:MI:SS')} : osc message received: ${obj.args}`,
    )
  })
})
```

### qrcode

`os`, `qrcode`([npm: qrcode](https://www.npmjs.com/package/qrcode)) を用いて，ローカル IP アドレスと`ngrok`([npm: ngrok](https://www.npmjs.com/package/ngrok))で生成した URL を QR にする。

```javascript
const ngrok = require('ngrok')
const qrcode = require('qrcode')

// get local ip addresses
let interfaces = os.networkInterfaces()
let addresses = []
for (let k in interfaces) {
  for (let k2 in interfaces[k]) {
    let address = interfaces[k][k2]
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address)
    }
  }
}
console.log(`local ip addresses: ${addresses}`)
console.log(`FOR LOCAL NEWORK PARTICIPANTS`)
qrcode.toString(
  `http://${addresses[0]}:${portnum}`,
  { type: 'terminal' },
  (err, str) => {
    console.log(str)
  },
)

// make ngrok tunnel
console.log(`FOR WWW PARTICIPANTS`)
;(async () => {
  let url = await ngrok.connect(portnum)
  console.log('ngrok URL: ' + url)
  qrcode.toString(url, { type: 'terminal' }, (err, str) => {
    console.log(str)
  })
})()
```

### つかう

```shell
npm start
```

これで QR コードが生成されるので，それをシェアすれば osc を送れる。同一 LAN にいるなら，上部の QR コードでおｋ。config ファイルでポート番号を指定し，デモはクライアント側の main.js で(今は)送る osc メッセージをハードコードしているので，適宜それを編集して使っていただければと思う。

![gif](https://i.gyazo.com/3872867c437f9bb2db573f1f3f2b69d1.gif)

### reference

- [Qiita: node.js と Processing を OSC でやりとり](https://qiita.com/tkyko13/items/d219a509d8367e272055)
- [yoppa.org: Processing Libraries 3 : oscP5 – OSC によるアプリケーション間通信](https://yoppa.org/sfc_design16/7927.html)
