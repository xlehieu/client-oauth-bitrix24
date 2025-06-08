// app/bitrix/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useMutationHook } from '@/hooks/useMutationHook';
import * as AuthService from '@/services/auth.service';
import ROUTE from '@/config/routes';
export default function BitrixAuth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [member_id, setMember_id] = useState<string | null>(searchParams.get('member_id'));
    const token = useMutationHook(() => AuthService.getToken(member_id!));
    useEffect(() => {
        if (!member_id) return;
        token.mutate({});
    }, [member_id]);
    useEffect(() => {
        if (!token.data) return;
        localStorage.setItem('access_token', token.data);
        router.push(ROUTE.SITEMAP_LV1.home.url);
    }, [token]);

    useEffect(() => {});
    return (
        <>
            {/* <Head>
                <script src="https://api.bitrix24.com/api/v1/"></script>
            </Head> */}
            <main>
                <h1>Ứng dụng Bitrix của tôi</h1>
                <p>Ứng dụng này đã được cài đặt thành công trên Bitrix24.</p>
                <p>Member ID: {member_id}</p>
                <p>Token: {token.data}</p>
            </main>
        </>
    );
}
