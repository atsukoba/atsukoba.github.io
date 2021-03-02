---
title: 'iOSプロジェクトへのFirebase導入で詰まったことメモ'
description: 'iOSプロジェクトへのFirebase導入で詰まったことのメモを残します．'
slug: ios-firebase
date: 2020-11-30 00:26:20
category: 'Tech Blog'
tags: [iOS, Firebase]
keyVisual: https://i.gyazo.com/be840f19639279330deb61f636e14685.png
---

### パッケージマネージャ

[Firebase を iOS プロジェクトに追加する - Google](https://firebase.google.com/docs/ios/setup?hl=ja)を参照すると，現状ではXcode 12.0 以降，CocoaPods 1.9.0 以降が推奨されているので，`Swift Packaging Manager`ではなく`Cocoapods`を使う．

### Property Listの扱い

FirebaseのconsoleでのApp追加時に取得する`plist`を環境毎に分けたい場合．それぞれFirebaseのプロジェクト毎にリネームし，iOSプロジェクト内に配置．

```swift
// AppDelegate.swift

// MARK: - Firebase init
let configFileName: String
#if DEBUG
configFileName = "GoogleService-dev-Info"
#else
configFileName = "GoogleService-prod-Info"
#endif
guard let filePath = Bundle.main.path(forResource: configFileName, ofType: "plist"),
    let options = FirebaseOptions(contentsOfFile: filePath) else {
    fatalError("Firebase plist file is not found.")
}
FirebaseApp.configure(options: options)
```

### Crashlystics導入

Build PhaseでビルドしたApp内に`plist`を配置する必要がある．

[Get started with Firebase Crashlytics - Google](https://firebase.google.com/docs/crashlytics/get-started)

ビルド時の最後に走らせる必要があるので，`Podfile`に定義する．

```Ruby
# Podfile

target 'PROJECT_NAME' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!
  
  pod 'Firebase/Crashlytics'
  script_phase :name=> 'FirebaseCrashlytics',
                 :script=> '"${PODS_ROOT}/FirebaseCrashlytics/run"',
                 :input_files=> ['$(SRCROOT)/$(BUILT_PRODUCTS_DIR)/$(INFOPLIST_PATH)']
```

そしてその前に各環境毎の`plist`をApp内の指定したパスにコピーしておく．ｌｐれはXCodeのCodegen上にスクリプトを足しておく．

```shell
# Type a script or drag a script file from your workspace to insert its path.

# Crashlytics用にGoogleService-Info.plistをビルドディレクトリにコピーする必要があるた
PATH_TO_GOOGLE_PLISTS="${PROJECT_DIR}/bengoshi-ios/Firebase"

case "${CONFIGURATION}" in
"Debug" )
cp -r "$PATH_TO_GOOGLE_PLISTS/GoogleService-dev-Info.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;

"Release" )
cp -r "$PATH_TO_GOOGLE_PLISTS/GoogleService-prod-Info.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;

*)
;;
esac
```

Firebase App Distributionの場合はアーカイブ時に `Rebuild from Bitcode`をオフにする．これによりdSYMが同梱されるためアップロードの必要がなくなるらしい．
App Store Connectにアップロードする際は，

## Firebase Analytics

以下のように各種イベントの種類等定義しておく

```swift
import Foundation
import Firebase
import FirebaseAnalytics

class EventLogs {
    // MARK: - LogIn
    static func loginInputTelNumber(success: Bool, error_type: String? = nil) {
        if success {
            Analytics.logEvent("ios_login_input_tel_number_succeed",
                               parameters: nil)
        } else {
            Analytics.logEvent("ios_login_input_tel_number_failure",
                               parameters: ["error_type": error_type as Any])
        }
    }
    static func login(success: Bool, error_type: String? = nil) {
        if success {
            Analytics.logEvent("login", parameters: ["method": "iOS"])
            Analytics.logEvent("ios_login_succeed", parameters: nil)
        } else {
            Analytics.logEvent("ios_login_failure",
                               parameters: ["error_type": error_type as Any])
        }
    }
    static func logout() {
        Analytics.logEvent("ios_logout", parameters: nil)
    }
    // MARK: - UI
    static func openModal() {
        Analytics.logEvent("ios_ui_modal_open", parameters: nil)
    }
    static func closeModal() {
        Analytics.logEvent("ios_ui_modal_close", parameters: nil)
    }
: 
:
```

ただ，Firabse AnaltyicsのEventは反映されるのに時間がかかるので，DebugView 機能を用いる．Xcodeで、`Product -> Scheme -> Edit scheme`のArgumentsタブで `-FIRDebugEnabled`を引数に設定する．すると，数十秒のラグでデバッグしながらイベントを確認できる．

### 参考

<https://www.apps-gcp.com/introduction-of-firebase-analytics/#i-5>
