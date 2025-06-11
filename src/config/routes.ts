export type IRoute = {
    name: string;
    url: string;
    method: string;
};
const SITEMAP_LV1 = {
    home: {
        url: '/',
        name: 'Trang chủ',
    },
    crm: {
        url: '/crm',
        name: 'CRM',
    },
};

const SITEMAP_LV2 = {
    contact: {
        name: 'Liên hệ',
        url: SITEMAP_LV1.crm.url + '/contacts',
    },
};

const SITEMAP_LV3 = {
    list: {
        name: 'Danh sách liên hệ khách hàng',
        url: SITEMAP_LV2.contact.url + '/list',
        method: 'crm.contact.list',
    },
    add: {
        name: 'Thêm liên hệ khách hàng',
        url: SITEMAP_LV2.contact.url + '/add',
        method: 'crm.contact.add',
    },
    detail: {
        name: 'Chi tiết liên hệ khách hàng',
        url: SITEMAP_LV2.contact.url + '/detail',
        method: 'crm.contact.get',
    },
    edit: {
        name: 'Cập nhật liên hệ khách hàng',
        url: SITEMAP_LV2.contact.url + '/edit',
        method: 'crm.contact.update',
    },
    delete: {
        name: 'Xóa liên hệ khách hàng',
        url: SITEMAP_LV2.contact.url + '/delete',
        method: 'crm.contact.delete',
    },
};
const ROUTE = {
    SITEMAP_LV1,
    SITEMAP_LV2,
    SITEMAP_LV3,
};
export default ROUTE;
