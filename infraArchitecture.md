# デジタルスタンプラリーシステム インフラ設計書

## システム概要

LINE公式アカウントと連携したデジタルスタンプラリーシステム。店舗でQRコードをスキャンしてスタンプを獲得し、一定数集めると特典がもらえる仕組み。管理者がユーザー一覧をGoogle スプレッドシートに書き出すことが可能。

## アーキテクチャ構成

### フロントエンド

**Next.js 14 (App Router)**
- LIFF（LINE Front-end Framework）対応
- ユーザー向けスタンプカード画面
- 管理者向けダッシュボード
- スプレッドシート書き出し機能UI
- SSR/SSGでSEO最適化

### ホスティング・デプロイ

**Vercel**
- Next.jsの最適なホスティング環境
- GitHub連携による自動デプロイ
- プレビューデプロイメント機能
- 環境変数管理（Google API認証情報）

### バックエンドAPI

**Cloud Functions(Gen2)**
- `/api/stamps` - スタンプ取得・付与
- `/api/webhook` - LINE Webhook受信
- `/api/admin/*` - 管理機能API
- `/api/analytics` - 分析データ取得
- `/api/export/spreadsheet` - **新規追加** スプレッドシート書き出しAPI
- `/api/export/status` - **新規追加** 書き出し状況確認API

### データベース

**Firestore（Firebase）**
- ユーザーデータ（LINE User ID、スタンプ進捗）
- 店舗情報・QRコード管理
- キャンペーン設定
- ログデータ
- **エクスポート履歴**（書き出し実行時刻、対象データ範囲）
- リアルタイム同期対応

### 認証・セキュリティ

**Firebase Authentication**
- LINE Login連携
- 管理者認証（Google/Email）
- JWT トークン管理

**Google Service Account** - **新規追加**
- Google Sheets API認証用
- サービスアカウントキー管理
- 最小権限の原則に基づく権限設定

### ファイルストレージ

**Cloud Storage**
- QRコード画像
- スタンプ画像
- 特典画像・クーポン
- **エクスポート用CSVファイル**（一時保存） - **新規追加**

### 外部連携

**LINE Messaging API**
- Webhook受信
- メッセージ送信（スタンプ獲得通知、特典配布）
- LIFF登録・管理

**Google Sheets API** - **新規追加**
- スプレッドシート作成・更新
- セル範囲指定での一括データ書き込み
- スプレッドシート共有設定
- 書き込み権限管理

**Google Drive API** - **新規追加**
- スプレッドシートファイル管理
- フォルダ組織化
- 共有リンク生成

### 分析・ログ

**Firebase Analytics**
- ユーザー行動分析
- コンバージョン追跡

**Cloud Logging** - **新規追加**
- スプレッドシート書き出し処理ログ
- エラーログ・パフォーマンス監視

### 開発・バージョン管理

**GitHub**
- ソースコード管理
- GitHub Actions（CI/CD）
- Issue管理・プロジェクト管理
- プルリクエストレビュー
- **Secrets管理**（Google Service Account Key）

## 技術スタック詳細

### フロントエンド技術

- Next.js 14 (React 18)
- TypeScript
- React Hook Form (フォーム管理)
- **React Query/SWR**（API状態管理） - **新規追加**

### バックエンド技術

- Node.js (Vercel Runtime)
- TypeScript
- Firebase Admin SDK
- LINE Bot SDK
- Crypto-js (セキュリティ)
- **googleapis**（Google Sheets/Drive API クライアント） - **新規追加**
- **csv-writer**（CSV生成ライブラリ） - **新規追加**

## スプレッドシート連携機能詳細

### 機能仕様

1. **データ書き出し対象**
   - ユーザー基本情報（LINE Display Name、User ID）
   - スタンプ獲得状況（店舗別獲得日時）
   - 特典受領履歴
   - 登録日・最終アクティブ日

2. **書き出し形式**
   - Google スプレッドシート直接書き込み
   - CSV形式での中間ファイル生成（バックアップ用）
   - 日付範囲指定での絞り込み対応

3. **セキュリティ考慮事項**
   - 管理者権限での実行制限
   - 個人情報の適切な取り扱い
   - 書き出し履歴の記録・追跡