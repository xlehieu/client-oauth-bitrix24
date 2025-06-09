'use client';
import { useMutationHook } from '@/hooks/useMutationHook';
import AddContactForm from './AddContactForm';
import * as ApiService from '@/services/apiBitrix.service';
import ROUTE from '@/config/routes';
import { useEffect, useState } from 'react';
import FillAlert from '@/components/Alert/FillAlert';
const ContactCreatePage = () => {
    const submitMutation = useMutationHook((data) => ApiService.callApiBitrix(ROUTE.SITEMAP_LV3.add.method, data));
    const [openAlert, setOpenAlert] = useState(false);
    const [title, setTitle] = useState('');
    const handleSubmitContact = async (data: any) => {
        if (
            !data.NAME ||
            !data.LAST_NAME ||
            !data.EMAIL[0].VALUE ||
            !data.PHONE[0].VALUE ||
            !data.ADDRESS ||
            !data.ADDRESS_CITY ||
            !data.ADDRESS_COUNTRY
        ) {
            setTitle('Vui lòng nhập đầy đủ thông tin');
            setOpenAlert(true);
            return;
        }
        if (data.PHONE[0].VALUE.startsWith('0')) {
            data.PHONE[0].VALUE = '+84' + data.PHONE[0].VALUE.slice(1);
        }
        submitMutation.mutate({ FIELDS: data });
    };
    useEffect(() => {
        if (submitMutation.isSuccess) {
            console.log('Dữ liệu trả về từ Bitrix:', submitMutation.data);
            setTitle('Thêm liên hệ thành công');
            setOpenAlert(true);
            const timeout = setTimeout(() => {
                submitMutation.reset();
            }, 1000); // delay 1 giây
        }
    }, [submitMutation.isSuccess, submitMutation.data]);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <AddContactForm onSubmit={handleSubmitContact} />
            {openAlert && <FillAlert open={openAlert} setOpen={setOpenAlert} title={title} />}
            {openAlert && <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded">✅ {title}</div>}
        </div>
    );
};

export default ContactCreatePage;
