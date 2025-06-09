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
        numeric: false,
        disablePadding: false,
        label: 'ID',
        isHide: false,
    },
    {
        id: 'NAME',
        numeric: false,
        disablePadding: false,
        label: 'NAME',
        isHide: false,
    },
    {
        id: 'LAST_NAME',
        numeric: false,
        disablePadding: false,
        label: 'LAST_NAME',
        isHide: false,
    },
    {
        id: 'EMAIL',
        numeric: false,
        disablePadding: false,
        label: 'EMAIL',
        isHide: false,
    },
    {
        id: 'PHONE',
        numeric: false,
        disablePadding: false,
        label: 'PHONE',
        isHide: false,
    },
    {
        id: 'ADDRESS',
        numeric: false,
        disablePadding: false,
        label: 'ADDRESS',
        isHide: false,
    },
    {
        id: 'ADDRESS_CITY',
        numeric: false,
        disablePadding: false,
        label: 'ADDRESS_CITY',
        isHide: true,
    },
    {
        id: 'ADDRESS_COUNTRY',
        numeric: false,
        disablePadding: false,
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
    }, [query]);
    return (
        <div>
            <EnhancedTable headCells={contactTableHeader} pageSize={10} rows={rows} key={'table contact'} isSelect />
        </div>
    );
};

export default List;
