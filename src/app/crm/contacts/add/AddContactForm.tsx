'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ROUTE from '@/config/routes';
const AddContactForm = ({
    onSubmit,
    formData,
    setFormData,
    titlePage,
}: {
    onSubmit: any;
    formData: any;
    titlePage?: string;
    setFormData: (data: any) => void;
}) => {
    const router = useRouter();
    const [currentField, setCurrentField] = useState({ type: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idxInputConfig?: number, idxMultipleField?: number) => {
        const { name, value } = e.target;
        console.log('idxInputConfig', idxInputConfig, 'idxMultipleField', idxMultipleField);
        console.log('DATA', name, '-', value);
        // setFormData((prev: any) => {
        //     const newValue = { ...prev };
        //     if (Array.isArray(formData) && formData.length > 0) {
        //     }
        // });
    };
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(formData); // callback gửi data ra ngoài
        console.log('Contact Submitted:', formData);
    };
    // CONFIG T
    // [
    //     {
    //         type: 'text',
    //         name: 'abc',
    //         title: 'abc',
    //         isRequired: true,
    //         placeholder: '',
    //         VALUE: '',
    //         multiple: {
    //             VALUE: '',
    //             VALUE_TYPE: '',
    //         },
    //     },
    //     {
    //         type: 'multipleField',
    //         name: 'hello',
    //         inputConfig: [
    //             {
    //                 type: 'text',
    //                 name: 'abc',
    //                 title: 'abc',
    //                 isRequired: true,
    //                 placeholder: '',
    //                 multipleField: {
    //                     VALUE: '',
    //                     VALUE_TYPE: '',
    //                 },
    //             },
    //             {
    //                 type: 'text',
    //                 name: 'abc',
    //                 title: 'abc',
    //                 isRequired: true,
    //                 placeholder: '',
    //             },
    //         ],
    //     },
    // ];
    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-5">
            <h2 className="text-2xl font-semibold text-gray-800">{titlePage}</h2>
            {Array.isArray(formData) &&
                formData?.length > 0 &&
                formData.map((inputCf, index) => (
                    <React.Fragment key={index}>
                        {inputCf?.type === 'multipleField' ? (
                            <React.Fragment>
                                {Array.isArray(inputCf.inputConfig) &&
                                    inputCf.inputConfig.length > 0 &&
                                    inputCf.inputConfig.map((itemInputCfMultiple: any, indexInputCf: number) => {
                                        {
                                            Array.isArray(itemInputCfMultiple?.multipleField) && itemInputCfMultiple?.multipleField ? (
                                                <React.Fragment key={indexInputCf + 'itemInputCfMultiple'}>
                                                    <div className="flex ">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                {itemInputCfMultiple?.[0]?.title}
                                                            </label>
                                                            <input
                                                                name={String(indexInputCf) + itemInputCfMultiple?.name + '0'}
                                                                value={formData?.[inputCf.name]?.[0]?.valueInput}
                                                                onChange={(e) => handleChange(e, indexInputCf, 0)}
                                                                className="w-full border rounded px-3 py-2 mt-1"
                                                                placeholder={
                                                                    itemInputCfMultiple?.[0]?.placeholder || 'Nhập' + itemInputCfMultiple?.[0]?.title
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                {itemInputCfMultiple?.[1]?.title}
                                                            </label>
                                                            <input
                                                                name={String(indexInputCf) + itemInputCfMultiple.name + '1'}
                                                                value={formData?.[inputCf.name]?.[1]?.valueInput}
                                                                onChange={(e) => handleChange(e, indexInputCf, 1)}
                                                                className="w-full border rounded px-3 py-2 mt-1"
                                                                placeholder={
                                                                    itemInputCfMultiple?.[1]?.placeholder || 'Nhập ' + itemInputCfMultiple?.[1]?.title
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment key={index + 'itemInputCfMultiple'}>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            {itemInputCfMultiple?.[index]?.title}
                                                        </label>
                                                        <input
                                                            name={itemInputCfMultiple?.name}
                                                            value={formData?.[inputCf.name]?.[index]?.valueInput}
                                                            onChange={handleChange}
                                                            className="w-full border rounded px-3 py-2 mt-1"
                                                            placeholder={
                                                                itemInputCfMultiple?.[index]?.placeholder ||
                                                                'Nhập ' + itemInputCfMultiple?.[index]?.title
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </React.Fragment>
                                            );
                                        }
                                    })}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{inputCf?.title || inputCf?.name}</label>
                                    <input
                                        name={inputCf?.name}
                                        value={inputCf?.valueInput || ''}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 mt-1"
                                        placeholder={inputCf?.placeholder || 'Nhập ' + inputCf?.title || ''}
                                        required
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">Tên</label>
                <input
                    name="NAME"
                    value={formData.NAME}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Nhập tên"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Họ</label>
                <input
                    name="LAST_NAME"
                    value={formData.LAST_NAME}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Nhập họ"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    name="EMAIL"
                    type="email"
                    value={formData.EMAIL[0].VALUE}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="example@email.com"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                    name="PHONE"
                    value={formData.PHONE[0].VALUE}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Nhập số điện thoại"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Địa chỉ (phường/xã, đường, số nhà)</label>
                <input
                    name="ADDRESS"
                    value={formData.ADDRESS}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Ví dụ: Số 1, Đường Lê Phụng Hiểu, Quận Hoàn Kiếm, TP Hà Nội"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Địa chỉ (phường/xã, đường, số nhà)</label>
                <input
                    name="ADDRESS"
                    value={formData.ADDRESS}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Ví dụ: Số 1, Đường Lê Phụng Hiểu, Quận Hoàn Kiếm, TP Hà Nội"
                />
            </div>
            <div className="flex ">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên ngân hàng</label>
                    <input
                        name="BANK_NAME"
                        value={formData.ADDRESS}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 mt-1"
                        placeholder="Ví dụ: Số 1, Đường Lê Phụng Hiểu, Quận Hoàn Kiếm, TP Hà Nội"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Số tài khoản ngân hàng</label>
                    <input
                        name="BANK_ACCOUNT_NUMBER"
                        value={formData.ADDRESS}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 mt-1"
                        placeholder="Ví dụ: Số 1, Đường Lê Phụng Hiểu, Quận Hoàn Kiếm, TP Hà Nội"
                    />
                </div>
            </div> */}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
                Thêm liên hệ
            </button>
        </form>
    );
};

export default AddContactForm;
