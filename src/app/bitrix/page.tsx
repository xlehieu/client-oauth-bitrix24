// app/bitrix/page.tsx
'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function BitrixApp() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).BX24) {
      (window as any).BX24.init(() => {
        console.log('Bitrix24 SDK initialized');
      });
    }
  }, []);

  return (
    <>
      <Head>
        <script src="https://api.bitrix24.com/api/v1/"></script>
      </Head>
      <main>
        <h1>Ứng dụng Bitrix của tôi</h1>
      </main>
    </>
  );
}
