// app/bitrix/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useState } from 'react';
import Head from 'next/head';
import { useMutationHook } from '@/hooks/useMutationHook';
import * as AuthService from '@/services/auth.service';
function BitrixContent() {
    const searchParams = useSearchParams();
    const [member_id, setMemberId] = useState<string | null>(searchParams.get('member_id'));
    const getTokenMutation = useMutationHook(async (member_id: string) => await AuthService.getToken(member_id));
    useEffect(() => {
        if (!member_id) return;
        getTokenMutation.mutate(member_id || '');
        const token = getTokenMutation.data as string;
        localStorage.setItem('token', token);
    }, [member_id]);

    return (
        <>
            {/* <Head>
                <script src="https://api.bitrix24.com/api/v1/"></script>
            </Head> */}
            <main>
                <h1>Ứng dụng Bitrix của tôi</h1>
                <p>Ứng dụng này đã được cài đặt thành công trên Bitrix24.</p>
                <p>Member ID: {member_id}</p>
                <p>Token: {getTokenMutation.data}</p>
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
