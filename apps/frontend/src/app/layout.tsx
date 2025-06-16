"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@line-demo/shared/contexts/AuthContext";
import { StampRallyProvider } from "@line-demo/shared/contexts/StampRallyContext";
import { GlobalContext } from "@line-demo/shared/contexts/GlobalContext";
import { Liff } from "@line/liff";
import { useCallback, useEffect, useState } from "react";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <GlobalContext.Provider value={{ liff: liffObject, liffError }}>
          <AuthProvider>
            <StampRallyProvider>
              {children}
            </StampRallyProvider>
          </AuthProvider>
        </GlobalContext.Provider>
      </body>
    </html>
  );
}
