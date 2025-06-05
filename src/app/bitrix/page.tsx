// app/bitrix/page.tsx
'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

export default function BitrixApp() {
  const router = useRouter();
  const { DOMAIN, APP_SID } = router.query;
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
        <p>Domain: {DOMAIN}</p>
        <p>App SID: {APP_SID}</p>
        <p>Ứng dụng này đã được cài đặt thành công trên Bitrix24. heeheheh</p>
      </main>
    </>
  );
}
