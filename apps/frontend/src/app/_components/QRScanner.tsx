'use client';

import { useGlobalContext } from '@line-demo/shared/hooks/useGlobalContext';
import { useStampRally } from '@line-demo/shared/contexts/StampRallyContext';
import { useState, useCallback } from 'react';

export const QRScanner = () => {
  const { liff } = useGlobalContext();
  const { checkStamp } = useStampRally();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback(async () => {
    if (!liff) return;

    try {
      setScanning(true);
      setError(null);
      const result = await liff.scanCodeV2();
      if (result.value) {
        await checkStamp(result.value);
      }
    } catch (_error) {
      setError('QRコードのスキャンに失敗しました');
      console.error('Scan error:', _error);
    } finally {
      setScanning(false);
    }
  }, [liff, checkStamp]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={handleScan}
        disabled={scanning || !liff}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium disabled:bg-gray-400"
      >
        {scanning ? 'スキャン中...' : 'QRコードをスキャン'}
      </button>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
}; 