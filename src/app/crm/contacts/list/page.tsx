import React from 'react';
import List from './List';
import { HeadCell } from '@/components/table/TableCF';
import ROUTE from '@/config/routes';
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
        style: {
            minWidth: '300px',
        },
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
const ContactList = () => {
    return (
        <div>
            <List
                tableHeader={contactTableHeader}
                method={ROUTE.SITEMAP_LV3.list.method}
                title={ROUTE.SITEMAP_LV3.list.name}
                urlAddPage={ROUTE.SITEMAP_LV3.add.url}
            />
        </div>
    );
};

export default ContactList;
