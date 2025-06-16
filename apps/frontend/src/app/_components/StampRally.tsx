'use client';

import { useGlobalContext } from '@line-demo/shared/hooks/useGlobalContext';
import { useStampRally } from '@line-demo/shared/contexts/StampRallyContext';
import { QRScanner } from './QRScanner';

export const StampRally = () => {
  const { stamps, collectedCount, isCompleted, resetStamps } = useStampRally();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">スタンプラリー</h1>
        <p className="text-gray-600">
          獲得スタンプ: {collectedCount}/8
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            className={`aspect-square rounded-lg border-2 p-4 flex flex-col items-center justify-center
              ${stamp.isCollected
                ? 'bg-green-100 border-green-500'
                : 'bg-gray-50 border-gray-200'
              }`}
          >
            <div className="text-lg font-bold mb-2">{stamp.name}</div>
            <div className="text-sm text-gray-600">{stamp.location}</div>
            {stamp.isCollected && (
              <div className="mt-2 text-green-600">
                ✓ 獲得済み
              </div>
            )}
          </div>
        ))}
      </div>

      <QRScanner />

      {isCompleted && (
        <div className="mt-8 text-center">
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
            おめでとうございます！全てのスタンプを集めました！
          </div>
          <button
            onClick={resetStamps}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600"
          >
            リセット
          </button>
        </div>
      )}
    </div>
  );
}; 