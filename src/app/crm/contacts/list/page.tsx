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
        label: 'Tên',
        isHide: false,
        style: {
            minWidth: '150px',
        },
    },
    {
        id: 'LAST_NAME',
        label: 'Họ',
        isHide: false,
    },
    {
        id: 'EMAIL',
        label: 'Email',
        isHide: false,
        style: {
            minWidth: '320px',
        },
    },
    {
        id: 'PHONE',
        label: 'Số điện thoại',
        isHide: false,
        style: {
            minWidth: '250px',
        },
    },
    {
        id: 'ADDRESS',
        label: 'Địa chỉ chi tiết',
        isHide: false,
        style: {
            minWidth: '330px',
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
    {
        id: 'UF_CRM_CONTACT_WEBSITES',
        label: 'Địa chỉ website',
        isHide: false,
        style: {
            minWidth: '300px',
        },
    },
    {
        id: 'UF_CRM_CONTACT_BANK_DETAILS',
        label: 'Tài khoản ngân hàng',
        isHide: false,
        style: {
            minWidth: '300px',
        },
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
                urlDetail={ROUTE.SITEMAP_LV3.detail.url}
            />
        </div>
    );
};

export default ContactList;
