'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryHook } from '@/hooks/useQueryHook';
import * as ApiBitrixService from '@/services/apiBitrix.service';
import ROUTE from '@/config/routes';

const Detail: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('ID');
    const [contact, setContact] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const queryContactById = useQueryHook('queryContactById', ApiBitrixService.callApiBitrix(ROUTE.SITEMAP_LV3.detail.method, { ID: id }));

    console.log('id', id);
    useEffect(() => {
        if (queryContactById.data) {
            console.log('queryContactById.data', queryContactById.data);
            setContact(queryContactById.data);
            setLoading(false);
        }
    }, [queryContactById]);

    if (loading)
        return (
            <div className="flex justify-center items-center mt-24">
                <span className="text-3xl">⌛ Loading...</span>.
            </div>
        );
    if (!contact)
        return (
            <div className="flex justify-center items-center mt-24">
                <span className="text-3xl">Không có dữ liệu</span>.
            </div>
        );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Chi tiết liên hệ</h1>
            <p>
                <strong>Họ tên:</strong> {contact.NAME} {contact.LAST_NAME}
            </p>
            <p>
                <strong>Email:</strong> {contact.EMAIL?.[0]?.VALUE || 'Không có'}
            </p>
            <p>
                <strong>Điện thoại:</strong> {contact.PHONE?.[0]?.VALUE || 'Không có'}
            </p>
            {/* Hiển thị thêm các trường khác nếu cần */}
        </div>
    );
};

export default Detail;
