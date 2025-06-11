'use client';
import { useMutationHook } from '@/hooks/useMutationHook';
import { useRouter, useSearchParams } from 'next/navigation';
import EditContactForm from './EditContactForm';
import * as ApiService from '@/services/apiBitrix.service';
import ROUTE from '@/config/routes';
import { useEffect, useState } from 'react';
import FillAlert from '@/components/Alert/FillAlert';
import * as ApiBitrixService from '@/services/apiBitrix.service';
import utils from '@/utils';
const ContactCreatePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('ID');
    const submitMutation = useMutationHook((data) => ApiService.callApiBitrix(ROUTE.SITEMAP_LV3.edit.method, data));
    const [openAlert, setOpenAlert] = useState(false);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [formData, setFormData] = useState<any>([
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
                    ID: '',
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
                    ID: '',
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
    const getContactMutation = useMutationHook((data) => ApiBitrixService.callApiBitrix(ROUTE.SITEMAP_LV3.detail.method || '', data));
    useEffect(() => {
        if (getContactMutation.data) {
            console.log('queryContactById.data', getContactMutation.data);
            const data = getContactMutation.data.result;
            Object.keys(data).forEach((key) => {
                const indexFormData = formData.findIndex((item: any) => item.name === key);
                if (indexFormData === -1) return;
                if (formData[indexFormData].type === 'text') formData[indexFormData].valueInput = data[key];
                else if (formData[indexFormData].type === 'multipleField' && formData[indexFormData].inputConfig?.[0].multipleField) {
                    if (Array.isArray(data[key])) {
                        data[key]?.forEach((item: any, indexData: number) => {
                            if (indexData === 0) {
                                formData[indexFormData].inputConfig[0].ID = item.ID || '';
                                formData[indexFormData].inputConfig[0].multipleField[0].valueInput = item?.VALUE || '';
                                formData[indexFormData].inputConfig[0].multipleField[1].valueInput = item?.VALUE_TYPE || '';
                            } else {
                                const template = { ...formData[indexFormData].inputConfig[0] };
                                formData[indexFormData].inputConfig.push({
                                    ...template,
                                    ID: item.ID,
                                    multipleField: [
                                        {
                                            ...template.multipleField[0],
                                            valueInput: item.VALUE || '',
                                        },
                                        {
                                            ...template.multipleField[1],
                                            valueInput: item.VALUE_TYPE || '',
                                        },
                                    ],
                                });
                            }
                        });
                        //Parse dữ liệu json
                        // bắt buộc theo cấu hình
                    } else if (Array.isArray(utils.parseJson(data[key]))) {
                        const dataArr = utils.parseJson(data[key]);
                        dataArr.forEach((item: any, indexDataKey: number) => {
                            if (typeof item === 'object') {
                                if (indexDataKey === 0) {
                                    Object.entries(item).forEach(([keyItem0, valueItem0]) => {
                                        formData[indexFormData].inputConfig[0].multipleField.forEach((itemMultipleField: any) => {
                                            if (itemMultipleField.value === keyItem0) {
                                                itemMultipleField.valueInput = valueItem0;
                                            }
                                        });
                                    });
                                } else {
                                    const template = formData[indexFormData]?.inputConfig?.[0];
                                    const dataKey = Object.keys(item);
                                    //dữ liệu parse json thì không có dataKey
                                    const indexID = dataKey.findIndex((item) => item === 'ID');
                                    dataKey.splice(indexID, 1);
                                    formData[indexFormData]?.inputConfig?.push({
                                        ...template,
                                        multipleField: [
                                            {
                                                ...template.multipleField[0],
                                                valueInput: item[dataKey[0]],
                                            },
                                            {
                                                ...template.multipleField[1],
                                                valueInput: item[dataKey[1]],
                                            },
                                        ],
                                    });
                                }
                            } else {
                                const template = formData[indexFormData].inputConfig[0];
                                if (indexDataKey === 0 && template) {
                                    formData[indexFormData].inputConfig[0].valueInput = item;
                                } else {
                                    formData[indexFormData].inputConfig.push({
                                        ...template,
                                        valueInput: item,
                                    });
                                }
                            }
                        });
                    }
                } else if (formData[indexFormData].type === 'multipleField' && !formData[indexFormData].inputConfig?.[0].multipleField) {
                    if (Array.isArray(utils.parseJson(data[key]))) {
                        utils.parseJson(data[key]).forEach((item: any, indexData: number) => {
                            if (indexData === 0) {
                                formData[indexFormData].inputConfig[0].valueInput = item || '';
                            } else {
                                const template = formData[indexFormData].inputConfig[0];
                                formData[indexFormData].inputConfig.push({
                                    ...template,
                                    valueInput: item,
                                });
                            }
                        });
                    }
                }
            });
            setLoading(false);
            setFormData(formData);
            return;
        }
        getContactMutation.mutate({ ID: id });
    }, [getContactMutation.data]);
    const handleSubmitContact = async (id: any, data: any) => {
        try {
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'PHONE') {
                    if (Array.isArray(value) && value.length > 0) {
                        value.forEach((itemValue: any) => {
                            if (itemValue?.VALUE?.startsWith('0')) {
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
            // console.log('data submit', data);
            const dataResponseMutation = await submitMutation.mutateAsync({ ID: id, FIELDS: data });
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
            if (submitMutation.data?.error || !submitMutation.data) {
                setTitle('Thêm liên hệ thất bại');
                setType('error');
                setOpenAlert(true);
                return;
            }
            setTitle('Thêm liên hệ thành công');
            setType('success');
            setOpenAlert(true);
            router.push(ROUTE.SITEMAP_LV3.list.url);
            // const timeout = setTimeout(() => {
            //     submitMutation.reset();
            // }, 1000); // delay 1 giây
        }
    }, [submitMutation.isSuccess, submitMutation.data]);
    return (
        <>
            {!loading && (
                <div className="p-6 bg-gray-50 min-h-screen">
                    <EditContactForm
                        templateFormData={getContactMutation?.data?.result}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmitContact}
                        actionGetData={ROUTE.SITEMAP_LV3.detail.method}
                    />
                    {openAlert && <FillAlert open={openAlert} setOpen={setOpenAlert} title={title} type={type} />}
                    {submitMutation.isPending && (
                        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-[999999999]">⏳ Đang xử lý...</div>
                    )}
                </div>
            )}
        </>
    );
};

export default ContactCreatePage;
