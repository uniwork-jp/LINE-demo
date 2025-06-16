'use client';

import { useGlobalContext } from '@line-demo/shared/hooks/useGlobalContext';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const { liff } = useGlobalContext();
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    if (!liff) return;

    try {
      if (!liff.isLoggedIn()) {
        await liff.login();
      }
      router.push('/rally');
    } catch (_error) {
      console.error('Login failed:', _error);
      // エラーハンドリングは必要に応じて実装
    }
  }, [liff, router]);

  useEffect(() => {
    if (liff?.isLoggedIn()) {
      router.push('/rally');
    }
  }, [liff, router]);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>ログイン</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <button type="submit" className={styles.button}>
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
} 