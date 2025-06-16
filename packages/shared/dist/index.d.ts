import * as react from 'react';
import { ReactNode } from 'react';
import { Liff } from '@line/liff';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface GlobalContextType {
    liff: Liff | null;
    liffError: string | null;
}
declare const GlobalContext: react.Context<GlobalContextType | null>;

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
declare const AuthProvider: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const useAuth: () => AuthContextType;

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
    resetStamps: () => void;
}
declare function StampRallyProvider({ children }: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useStampRally(): StampRallyContextType;

declare const useGlobalContext: () => GlobalContextType;

export { AuthProvider, GlobalContext, type GlobalContextType, StampRallyProvider, useAuth, useGlobalContext, useStampRally };
