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
        if (!data.NAME || !data.LAST_NAME || !data.EMAIL.VALUE || !data.PHONE.VALUE || !data.ADDRESS || !data.ADDRESS_CITY || !data.ADDRESS_COUNTRY) {
            setTitle('Vui lòng nhập đầy đủ thông tin');
            setOpenAlert(true);
            return;
        }
        if (data.PHONE.VALUE && data.PHONE.VALUE.startWith('0')) {
            data.PHONE.VALUE = '+84' + data.PHONE.slice(1);
        }
        submitMutation.mutate({ FIELDS: data });
    };
    useEffect(() => {
        if (submitMutation.isSuccess) {
            console.log('Dữ liệu trả về từ Bitrix:', submitMutation.data);
            setTitle('Thêm liên hệ thành công');
            setOpenAlert(true);
            submitMutation.reset();
        }
    }, [submitMutation.isSuccess, submitMutation.data]);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <AddContactForm onSubmit={handleSubmitContact} />
            {submitMutation.isSuccess && <FillAlert open={openAlert} setOpen={setOpenAlert} title={title} />}
        </div>
    );
};

export default ContactCreatePage;
