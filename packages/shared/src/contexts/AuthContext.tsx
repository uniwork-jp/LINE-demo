'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import type { Liff } from '@line/liff';

interface AuthContextType {
  isLoggedIn: boolean;
  profile: {
    userId: string;
    displayName: string;
    pictureUrl?: string;
  } | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { liff } = useGlobalContext();
  const [profile, setProfile] = useState<AuthContextType['profile']>(null);

  useEffect(() => {
    if (liff?.isLoggedIn()) {
      liff.getProfile()
        .then((profile) => {
          setProfile({
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
          });
        })
        .catch((error: Error) => {
          console.error('Failed to get profile:', error);
        });
    }
  }, [liff]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: liff?.isLoggedIn() ?? false,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 