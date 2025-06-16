"use client";

import { createContext } from 'react';
import type { Liff } from '@line/liff';

export interface GlobalContextType {
  liff: Liff | null;
  liffError: string | null;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);