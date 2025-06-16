'use client';

import Image from 'next/image';

const QR_CODES = [
  { id: 1, name: 'スタンプ1', location: '東京駅' },
  { id: 2, name: 'スタンプ2', location: '新宿駅' },
  { id: 3, name: 'スタンプ3', location: '渋谷駅' },
  { id: 4, name: 'スタンプ4', location: '池袋駅' },
  { id: 5, name: 'スタンプ5', location: '上野駅' },
  { id: 6, name: 'スタンプ6', location: '品川駅' },
  { id: 7, name: 'スタンプ7', location: '秋葉原駅' },
  { id: 8, name: 'スタンプ8', location: '東京スカイツリー' },
];

export default function QRPage() {
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">スタンプラリー QRコード</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {QR_CODES.map((qr) => (
            <div
              key={qr.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-3">
                <Image
                  src={`/qrs/stamp_qr_${qr.id}.png`}
                  alt={`${qr.name}のQRコード`}
                  fill
                  className="object-contain"
                  priority={qr.id <= 4} // 最初の4枚を優先的に読み込み
                />
              </div>
              <h2 className="font-semibold text-lg mb-1">{qr.name}</h2>
              <p className="text-sm text-gray-600">{qr.location}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}