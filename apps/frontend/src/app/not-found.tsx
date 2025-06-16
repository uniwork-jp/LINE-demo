'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">ページが見つかりません</p>
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        ホームに戻る
      </Link>
    </div>
  );
} 