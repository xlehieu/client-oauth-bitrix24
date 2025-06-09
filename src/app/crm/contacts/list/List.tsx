'use client';
import React, { useEffect, useState } from 'react';
import * as ApiService from '@/services/apiBitrix.service';
import { useQueryHook } from '@/hooks/useQueryHook';
import ROUTE from '@/config/routes';
import { useQuery } from '@tanstack/react-query';
import EnhancedTable, { HeadCell } from '@/components/table/EnhancedTable';
const contactTableHeader: HeadCell[] = [
    {
        id: 'ID',
        label: 'ID',
        isHide: false,
    },
    {
        id: 'NAME',
        label: 'NAME',
        isHide: false,
    },
    {
        id: 'LAST_NAME',
        label: 'LAST_NAME',
        isHide: false,
    },
    {
        id: 'EMAIL',
        label: 'EMAIL',
        isHide: false,
    },
    {
        id: 'PHONE',
        label: 'PHONE',
        isHide: false,
    },
    {
        id: 'ADDRESS',
        label: 'ADDRESS',
        isHide: false,
    },
    {
        id: 'ADDRESS_CITY',
        label: 'ADDRESS_CITY',
        isHide: true,
    },
    {
        id: 'ADDRESS_COUNTRY',
        label: 'ADDRESS_COUNTRY',
        isHide: true,
    },
];
const List = () => {
    const query = useQueryHook(
        'query list contact',
        ApiService.getDataApiBitrix(ROUTE.SITEMAP_LV3.list.method, {
            select: contactTableHeader.map((item) => item.id),
        }),
    );
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (query.isSuccess) {
            console.log('query.data', query.data);
            setRows(query.data.result);
        }
    }, [query.isSuccess]);
    return (
        <div className="mt-6">
            DANH SÁCH LIÊN HỆ
            <EnhancedTable headCells={contactTableHeader} pageSize={10} rows={rows} key={'table contact'} />
        </div>
    );
};

export default List;
