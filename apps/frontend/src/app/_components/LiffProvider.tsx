'use client';

import { GlobalContext } from "@line-demo/shared/contexts/GlobalContext";
import { Liff } from "@line/liff";
import { useCallback, useEffect, useState } from "react";

export const LiffProvider = ({ children }: { children: React.ReactNode }) => {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  const initLiff = useCallback(async () => {
    try {
      const liff = (await import("@line/liff")).default;
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
      setLiffObject(liff);
    } catch (error) {
      setLiffError(error instanceof Error ? error.message : "Failed to initialize LIFF");
    }
  }, []);

  useEffect(() => {
    initLiff();
  }, [initLiff]);

  return (
    <GlobalContext.Provider value={{ liff: liffObject, liffError }}>
      {children}
    </GlobalContext.Provider>
  );
}; 