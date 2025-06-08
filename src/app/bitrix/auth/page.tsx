// app/bitrix/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useMutationHook } from '@/hooks/useMutationHook';
import * as AuthService from '@/services/auth.service';
import ROUTE from '@/config/routes';
import { useQueryHook } from '@/hooks/useQueryHook';
export default function BitrixAuth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const member_id = searchParams.get('member_id');
    const getTokenMutation = useMutationHook(async (member_id: string) => await AuthService.getToken(member_id));
    let token: any;
    if (member_id) token = useQueryHook(member_id + '', AuthService.getToken(member_id!));
    useEffect(() => {
        if (token?.data) {
            localStorage.setItem('access_token', token.data);
            router.push(ROUTE.SITEMAP_LV1.home.url);
        }
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
                <p>Token: {getTokenMutation.data}</p>
            </main>
        </>
    );
}
