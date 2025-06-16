'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
      <p className="text-xl mb-8 text-red-500">{error.message}</p>
      <button
        onClick={reset}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600"
      >
        もう一度試す
      </button>
    </div>
  );
} 