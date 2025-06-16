'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Stamp {
  id: number;
  name: string;
  location: string;
  isCollected: boolean;
  collectedAt?: Date;
}

interface StampRallyContextType {
  stamps: Stamp[];
  collectedCount: number;
  isCompleted: boolean;
  collectStamp: (stampId: number) => void;
  checkStamp: (stampId: string) => Promise<void>;
  resetStamps: () => void;
}

const StampRallyContext = createContext<StampRallyContextType | undefined>(undefined);

const INITIAL_STAMPS: Stamp[] = [
  { id: 1, name: 'スタンプ1', location: '地点1', isCollected: false },
  { id: 2, name: 'スタンプ2', location: '地点2', isCollected: false },
  { id: 3, name: 'スタンプ3', location: '地点3', isCollected: false },
  { id: 4, name: 'スタンプ4', location: '地点4', isCollected: false },
  { id: 5, name: 'スタンプ5', location: '地点5', isCollected: false },
  { id: 6, name: 'スタンプ6', location: '地点6', isCollected: false },
  { id: 7, name: 'スタンプ7', location: '地点7', isCollected: false },
  { id: 8, name: 'スタンプ8', location: '地点8', isCollected: false },
];

export function StampRallyProvider({ children }: { children: ReactNode }) {
  const [stamps, setStamps] = useState<Stamp[]>(() => {
    // ローカルストレージから保存されたスタンプデータを読み込む
    if (typeof window !== 'undefined') {
      const savedStamps = localStorage.getItem('stamps');
      if (savedStamps) {
        return JSON.parse(savedStamps);
      }
    }
    return INITIAL_STAMPS;
  });

  const collectedCount = stamps.filter(stamp => stamp.isCollected).length;
  const isCompleted = collectedCount === stamps.length;

  useEffect(() => {
    // スタンプデータをローカルストレージに保存
    localStorage.setItem('stamps', JSON.stringify(stamps));
  }, [stamps]);

  const collectStamp = (stampId: number) => {
    setStamps(prevStamps =>
      prevStamps.map(stamp =>
        stamp.id === stampId
          ? { ...stamp, isCollected: true, collectedAt: new Date() }
          : stamp
      )
    );
  };

  const checkStamp = async (stampId: string) => {
    const id = parseInt(stampId, 10);
    if (isNaN(id) || id < 1 || id > stamps.length) {
      throw new Error('無効なスタンプIDです');
    }
    collectStamp(id);
  };

  const resetStamps = () => {
    setStamps(INITIAL_STAMPS);
  };

  return (
    <StampRallyContext.Provider
      value={{
        stamps,
        collectedCount,
        isCompleted,
        collectStamp,
        checkStamp,
        resetStamps,
      }}
    >
      {children}
    </StampRallyContext.Provider>
  );
}

export function useStampRally() {
  const context = useContext(StampRallyContext);
  if (context === undefined) {
    throw new Error('useStampRally must be used within a StampRallyProvider');
  }
  return context;
} 