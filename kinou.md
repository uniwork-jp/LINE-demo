# デジタルスタンプラリーシステム 機能一覧表

## ユーザー機能（一般利用者）

| 機能カテゴリ | 機能名 | 詳細説明 | 実装場所 | 優先度 |
|-------------|--------|----------|----------|--------|
| **認証・プロフィール** | LINE連携ログイン | LINE公式アカウント経由でのログイン | LIFF + Firebase Auth | 高 |
| | プロフィール表示 | ユーザー名、アイコン表示 | Next.js Frontend | 中 |
| | 利用規約同意 | 初回利用時の規約同意 | Next.js Frontend | 高 |
| **スタンプ機能** | QRコードスキャン | 店舗QRコードの読み取り | LIFF Camera API | 高 |
| | スタンプ獲得 | スキャン成功時のスタンプ付与 | Cloud Functions API | 高 |
| | スタンプカード表示 | 現在の獲得状況可視化 | Next.js Frontend | 高 |
| | 獲得履歴確認 | 店舗別・日付別の獲得履歴 | Next.js Frontend | 中 |
| | 重複チェック | 同店舗での重複獲得防止 | Cloud Functions | 高 |
| **特典・リワード** | 特典一覧表示 | 利用可能な特典の確認 | Next.js Frontend | 高 |
| | 特典交換 | スタンプ数に応じた特典受領 | Cloud Functions API | 高 |
| | クーポン表示 | 獲得したクーポンの表示 | Next.js Frontend | 高 |
| | 特典利用履歴 | 過去の特典利用状況 | Next.js Frontend | 中 |
| **通知機能** | スタンプ獲得通知 | LINE メッセージでの獲得通知 | LINE Messaging API | 中 |
| | 特典交換通知 | 特典獲得時のお知らせ | LINE Messaging API | 中 |
| | キャンペーン告知 | 新キャンペーンの案内 | LINE Messaging API | 低 |

## 管理者機能（店舗・運営者）

| 機能カテゴリ | 機能名 | 詳細説明 | 実装場所 | 優先度 |
|-------------|--------|----------|----------|--------|
| **認証・権限** | 管理者ログイン | Google/Email認証 | Firebase Auth | 高 |
| | 権限管理 | 店舗別・機能別権限設定 | Firebase Auth + Custom Claims | 中 |
| | アクセス制御 | IPアドレス制限等 | Cloud Functions | 低 |
| **店舗管理** | 店舗情報登録 | 店舗名、住所、連絡先等 | Next.js Admin Panel | 高 |
| | 店舗情報編集 | 既存店舗情報の更新 | Next.js Admin Panel | 高 |
| | QRコード生成 | 店舗固有のQRコード作成 | Cloud Functions | 高 |
| | QRコード管理 | 生成済みQRコードの一覧・更新 | Next.js Admin Panel | 中 |
| **キャンペーン管理** | キャンペーン作成 | 新規キャンペーンの設定 | Next.js Admin Panel | 高 |
| | キャンペーン編集 | 期間、条件、特典の変更 | Next.js Admin Panel | 高 |
| | キャンペーン停止/再開 | 一時停止・再開機能 | Next.js Admin Panel | 中 |
| | 特典設定 | リワード内容・交換条件設定 | Next.js Admin Panel | 高 |
| **ユーザー管理** | ユーザー一覧表示 | 登録ユーザーの検索・表示 | Next.js Admin Panel | 高 |
| | ユーザー詳細確認 | 個別ユーザーの獲得状況 | Next.js Admin Panel | 中 |
| | スタンプ手動付与 | 管理者による直接付与 | Cloud Functions API | 中 |
| | ユーザーブロック | 不正利用者の利用停止 | Cloud Functions API | 低 |
| **データ出力** | **ユーザー一覧エクスポート** | **Google スプレッドシート書き出し** | **Google Sheets API** | **高** |
| | CSV出力 | ユーザーデータのCSV形式出力 | Cloud Functions | 中 |
| | レポート生成 | 期間指定での利用状況レポート | Next.js Admin Panel | 中 |
| **分析・統計** | 利用統計表示 | 日別・店舗別の利用状況 | Firebase Analytics | 中 |
| | コンバージョン分析 | スタンプ→特典の転換率 | Next.js Admin Panel | 中 |
| | リアルタイム監視 | 現在のアクティブユーザー数 | Firebase Analytics | 低 |

## システム機能（内部処理）

| 機能カテゴリ | 機能名 | 詳細説明 | 実装場所 | 優先度 |
|-------------|--------|----------|----------|--------|
| **API・連携** | LINE Webhook処理 | LINE からのイベント受信 | Cloud Functions | 高 |
| | LIFF設定管理 | LINE アプリ内ブラウザ設定 | LINE Developers Console | 高 |
| | 外部API連携 | 決済・配送サービス連携 | Cloud Functions | 低 |
| **データ管理** | データベース同期 | Firestore リアルタイム同期 | Firestore | 高 |
| | バックアップ処理 | 定期的なデータバックアップ | Cloud Storage | 中 |
| | データ暗号化 | 個人情報の暗号化保存 | Firebase | 高 |
| **セキュリティ** | 不正アクセス検知 | 異常なアクセスパターン検知 | Cloud Functions | 中 |
| | レート制限 | API呼び出し頻度制限 | Cloud Functions | 中 |
| | ログ記録 | 全操作の監査ログ保存 | Cloud Logging | 高 |
| **運用・監視** | ヘルスチェック | システム稼働状況監視 | Vercel + Firebase | 中 |
| | エラー通知 | 障害発生時のアラート | Cloud Logging | 中 |
| | パフォーマンス監視 | 応答速度・リソース使用量 | Firebase Performance | 低 |

## デプロイ・CI/CD機能

| 機能カテゴリ | 機能名 | 詳細説明 | 実装場所 | 優先度 |
|-------------|--------|----------|----------|--------|
| **開発環境** | 自動デプロイ | GitHub連携による自動デプロイ | Vercel + GitHub Actions | 高 |
| | プレビュー環境 | PR作成時のプレビュー環境構築 | Vercel | 中 |
| | 環境変数管理 | 本番・開発環境の設定分離 | Vercel + GitHub Secrets | 高 |
| **テスト・品質** | 自動テスト実行 | Unit/Integration テスト | GitHub Actions | 中 |
| | コード品質チェック | ESLint, Prettier による品質管理 | GitHub Actions | 中 |
| | セキュリティスキャン | 脆弱性検出・依存関係チェック | GitHub Actions | 低 |

## 機能開発優先度まとめ

### **フェーズ1（MVP: 最小実行可能製品）**
- ユーザー認証（LINE連携）
- QRコードスキャン・スタンプ獲得
- スタンプカード表示
- 基本的な管理者機能（店舗・キャンペーン管理）

### **フェーズ2（機能拡張）**
- **ユーザー一覧スプレッドシート出力**
- 特典交換機能
- 通知機能（LINE メッセージ）
- 分析・レポート機能

### **フェーズ3（高度機能）**
- 詳細な分析機能
- 外部サービス連携
- セキュリティ強化
- パフォーマンス最適化