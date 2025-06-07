'use client';
import React, { useEffect, useState } from 'react';
import * as ApiService from '@/services/apiBitrix.service';
import { useQueryHook } from '@/hooks/useQueryHook';
import ROUTE from '@/config/routes';
const List = () => {
    const query = useQueryHook('query list contact', () => ApiService.getDataApiBitrix(ROUTE.SITEMAP_LV3.list.method, {}));
    useEffect(() => {
        if (query.isSuccess) {
            console.log('query.data', query.data);
        }
    }, [query]);
    return <div></div>;
};

export default List;
