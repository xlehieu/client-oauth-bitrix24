'use client';
import React, { useEffect, useState } from 'react';
import * as ApiService from '@/services/apiBitrix.service';
import { useQueryHook } from '@/hooks/useQueryHook';
import TableCF, { HeadCell } from '@/components/table/EnhancedTable';
import Link from 'next/link';
const List = ({
    tableHeader = [],
    method = '',
    title = '',
    urlAddPage,
}: {
    urlAddPage?: string;
    tableHeader: HeadCell[];
    method: string;
    title?: string;
}) => {
    const query = useQueryHook(
        'query list',
        ApiService.callApiBitrix(method, {
            select: tableHeader.map((item: any) => item.id),
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
            <div className="flex justify-between mb-4">
                {title && <h1 className="text-xl font-semibold text-gray-800">{title}</h1>}
                {urlAddPage && (
                    <Link className="px-2 py-1 rounded bg-amber-900 text-white" href={urlAddPage}>
                        Thêm mới
                    </Link>
                )}
            </div>
            <TableCF headCells={tableHeader} pageSize={10} rows={rows} key={'table contact'} />
        </div>
    );
};

export default List;
