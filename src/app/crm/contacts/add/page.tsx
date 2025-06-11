'use client';
import { useMutationHook } from '@/hooks/useMutationHook';
import { useRouter } from 'next/navigation';
import AddContactForm from './AddContactForm';
import * as ApiService from '@/services/apiBitrix.service';
import ROUTE from '@/config/routes';
import { useEffect, useState } from 'react';
import FillAlert from '@/components/Alert/FillAlert';
const ContactCreatePage = () => {
    const router = useRouter();
    const submitMutation = useMutationHook((data) => ApiService.callApiBitrix(ROUTE.SITEMAP_LV3.add.method, data));
    const [openAlert, setOpenAlert] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [formData, setformData] = useState<any>([
        {
            type: 'text',
            name: 'NAME',
            title: 'Tên',
            isRequired: true,
            placeholder: 'Nhập tên',
            valueInput: '',
        },
        {
            type: 'text',
            name: 'LAST_NAME',
            title: 'Họ',
            isRequired: true,
            placeholder: 'Nhập họ',
            valueInput: '',
        },
        {
            type: 'multipleField',
            name: 'EMAIL',
            title: 'Email',
            inputConfig: [
                {
                    // isRequired: true,
                    multipleField: [
                        {
                            title: 'Địa chỉ email',
                            placeholder: 'Nhập email',
                            value: 'VALUE',
                            valueInput: '',
                        },
                        {
                            title: 'Loại email',
                            value: 'VALUE_TYPE',
                            placeHolder: 'Nhập loại email',
                            valueInput: '',
                        },
                    ],
                },
            ],
        },
        {
            type: 'multipleField',
            name: 'PHONE',
            title: 'Số điện thoại',
            inputConfig: [
                {
                    multipleField: [
                        {
                            title: 'Số điện thoại',
                            isRequired: true,
                            placeholder: 'Nhập số điện thoại',
                            value: 'VALUE',
                            valueInput: '',
                        },
                        {
                            title: 'Loại số điện thoại',
                            isRequired: true,
                            placeHolder: 'Nhập loại số điện thoại',
                            value: 'VALUE_TYPE',
                            valueInput: '',
                        },
                    ],
                },
            ],
        },
        {
            type: 'text',
            name: 'ADDRESS',
            title: 'Địa chỉ',
            isRequired: true,
            placeholder: 'Nhập địa chỉ chi tiết',
            valueInput: '',
        },
        {
            type: 'text',
            name: 'ADDRESS_CITY',
            title: 'Thành phố',
            isRequired: true,
            placeholder: 'Nhập thành phố',
            valueInput: '',
        },
        {
            type: 'text',
            name: 'ADDRESS_COUNTRY',
            title: 'Quốc gia',
            isRequired: true,
            placeholder: 'Nhập quốc gia',
            valueInput: '',
        },
        {
            type: 'multipleField',
            name: 'UF_CRM_CONTACT_BANK_DETAILS',
            title: 'Thông tin ngân hàng',
            inputConfig: [
                {
                    multipleField: [
                        {
                            title: 'Tên ngân hàng',
                            isRequired: true,
                            placeholder: 'Nhập tên ngân hàng',
                            value: 'BANK_NAME',
                            valueInput: '',
                        },
                        {
                            title: 'Số tài khoản',
                            value: 'BANK_ACCOUNT',
                            isRequired: true,
                            placeHolder: 'Nhập số tài khoản',
                            valueInput: '',
                        },
                    ],
                },
            ],
        },
        {
            type: 'multipleField',
            name: 'UF_CRM_CONTACT_WEBSITES',
            title: 'Thông tin website',
            inputConfig: [
                {
                    title: 'Tên website',
                    name: 'WEBSITE',
                    isRequired: true,
                    valueInput: '',
                    placeholder: 'Nhập địa chỉ website',
                },
            ],
        },
    ]);

    const handleSubmitContact = async (data: any) => {
        try {
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'PHONE') {
                    if (Array.isArray(value) && value.length > 0) {
                        value.forEach((itemValue: any) => {
                            if (itemValue.VALUE.startsWith('0')) {
                                itemValue.VALUE = '+84' + itemValue.VALUE.slice(1);
                            }
                        });
                    }
                }
                // biến đổi thành chuỗi json
                if (key.startsWith('UF_CRM')) {
                    console.log('value', JSON.stringify(value));
                    data[key] = JSON.stringify(value);
                }
            });
            // console.log('data', data);
            // return;
            const dataResponseMutation = await submitMutation.mutateAsync({
                FIELDS: data,
                PARAMS: {
                    REGISTER_SONET_EVENT: 'N',
                    REGISTER_HISTORY_EVENT: 'N',
                },
            });
            console.log('dataResponseMutation', dataResponseMutation);
        } catch (err) {
            if (err instanceof Error) {
                setTitle(err.message); // ✅ Truy cập message an toàn
            } else {
                setTitle('Đã có lỗi xảy ra'); // fallback
            }
            setType('error');
            setOpenAlert(true);
        }
    };
    useEffect(() => {
        if (submitMutation.isSuccess) {
            if (submitMutation.data?.error) {
                setTitle('Thêm liên hệ thất bại');
                setOpenAlert(true);
                return;
            }
            setTitle('Thêm liên hệ thành công');
            setOpenAlert(true);
            router.push(ROUTE.SITEMAP_LV3.list.url);
            // const timeout = setTimeout(() => {
            //     submitMutation.reset();
            // }, 1000); // delay 1 giây
        }
    }, [submitMutation.isSuccess, submitMutation.data]);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <AddContactForm formData={formData} setFormData={setformData} onSubmit={handleSubmitContact} />
            {openAlert && <FillAlert open={openAlert} setOpen={setOpenAlert} title={title} type={type} />}
            {submitMutation.isPending && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-[999999999]">⏳ Đang xử lý...</div>
            )}
        </div>
    );
};

export default ContactCreatePage;
