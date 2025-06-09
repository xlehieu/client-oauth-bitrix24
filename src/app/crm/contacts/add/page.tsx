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
    const handleSubmitContact = async (data: any) => {
        console.log('Dữ liệu gửi lên Bitrix:', { FIELDS: data });
        submitMutation.mutate({ FIELDS: data });
    };
    useEffect(() => {
        if (submitMutation.isSuccess) {
            setOpenAlert(true);
            submitMutation.reset();
        }
    }, [submitMutation]);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <AddContactForm onSubmit={handleSubmitContact} />
            {submitMutation.isSuccess && <FillAlert open={openAlert} setOpen={setOpenAlert} title="Thêm liên hệ thành công" />}
        </div>
    );
};

export default ContactCreatePage;
