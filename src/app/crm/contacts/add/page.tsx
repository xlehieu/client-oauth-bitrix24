'use client';
import { useMutationHook } from '@/hooks/useMutationHook';
import AddContactForm from './AddContactForm';
import * as ApiService from '@/services/apiBitrix.service';
import ROUTE from '@/config/routes';
const ContactCreatePage = () => {
    const submitMutation = useMutationHook((data) => ApiService.callApiBitrix(ROUTE.SITEMAP_LV3.add.method, data));
    const handleSubmitContact = async (data: any) => {
        console.log('Dữ liệu gửi lên Bitrix:', data);
        submitMutation.mutate(data);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <AddContactForm onSubmit={handleSubmitContact} />
        </div>
    );
};

export default ContactCreatePage;
