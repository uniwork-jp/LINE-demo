'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';

interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  profile: Profile | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { liff } = useGlobalContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!liff) return;

    const checkLogin = async () => {
      const loggedIn = liff.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        try {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        } catch (error) {
          console.error('Failed to get profile:', error);
          setProfile(null);
        }
      }
    };

    checkLogin();
  }, [liff]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 