'use client';

import { useGlobalContext } from '@/hooks/useGlobalContext';
import { useStampRally } from '@/contexts/StampRallyContext';
import { useState, useCallback } from 'react';

export const QRScanner = () => {
  const { liff } = useGlobalContext();
  const { collectStamp } = useStampRally();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScan = useCallback(async () => {
    if (!liff) {
      setError('LIFFが初期化されていません');
      return;
    }

    try {
      setIsScanning(true);
      setError(null);

      // LIFFのカメラAPIを使用してQRコードをスキャン
      const result = await liff.scanCodeV2();
      
      if (result.value) {
        try {
          // QRコードの値からスタンプIDを取得
          const stampId = parseInt(result.value, 10);
          if (!isNaN(stampId) && stampId >= 1 && stampId <= 8) {
            collectStamp(stampId);
          } else {
            setError('無効なQRコードです');
          }
        } catch (e) {
          setError('QRコードの読み取りに失敗しました');
        }
      }
    } catch (e) {
      setError('カメラの起動に失敗しました');
    } finally {
      setIsScanning(false);
    }
  }, [liff, collectStamp]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={startScan}
        disabled={isScanning || !liff}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium disabled:bg-gray-400"
      >
        {isScanning ? 'スキャン中...' : 'QRコードをスキャン'}
      </button>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
}; 