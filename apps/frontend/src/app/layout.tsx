import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@line-demo/shared/contexts/AuthContext";
import { StampRallyProvider } from "@line-demo/shared/contexts/StampRallyContext";
import { LiffProvider } from "./_components/LiffProvider";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

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
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <MantineProvider>
          <LiffProvider>
            <AuthProvider>
              <StampRallyProvider>
                {children}
              </StampRallyProvider>
            </AuthProvider>
          </LiffProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
