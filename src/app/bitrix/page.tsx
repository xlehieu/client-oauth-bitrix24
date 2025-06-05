// app/bitrix/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Head from 'next/head';

function BitrixContent() {
  const searchParams = useSearchParams();
  const DOMAIN = searchParams.get('DOMAIN');
  const APP_SID = searchParams.get('APP_SID');

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
        <p>Ứng dụng này đã được cài đặt thành công trên Bitrix24.</p>
      </main>
    </>
  );
}

export default function BitrixApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BitrixContent />
    </Suspense>
  );
}
