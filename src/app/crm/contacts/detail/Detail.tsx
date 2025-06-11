'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryHook } from '@/hooks/useQueryHook';
import * as ApiBitrixService from '@/services/apiBitrix.service';
import ROUTE from '@/config/routes';
import { useMutationHook } from '@/hooks/useMutationHook';
import utils from '@/utils';
export default function Detail({ action, actionDelete }: any) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('ID');
    const [contact, setContact] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const queryContactById = useQueryHook('queryContactById' + id, ApiBitrixService.callApiBitrix(action || '', { ID: id || '' }));
    useEffect(() => {
        if (queryContactById.data) {
            console.log('queryContactById.data', queryContactById.data);
            setContact(queryContactById.data.result);
            setLoading(false);
        }
    }, [queryContactById]);
    const deleteMutation = useMutationHook(() => ApiBitrixService.callApiBitrix(actionDelete || '', { ID: id || '' }));
    const handleDelete = () => {
        if (!window.confirm('Xác nhận xóa')) return;
        deleteMutation.mutate({});
    };
    useEffect(() => {
        if (deleteMutation.data) {
            alert('Xóa thành công');
            router.push(ROUTE.SITEMAP_LV3.list.url);
        }
    }, [deleteMutation]);

    const parseJson = utils.parseJson;
    if (loading)
        return (
            <div className="flex justify-center items-center mt-24">
                <span className="text-3xl">⌛ Loading...</span>.
            </div>
        );
    if (!contact)
        return (
            <div className="flex justify-center items-center mt-24">
                <span className="text-3xl">Không có dữ liệu</span>.
            </div>
        );

    return (
        <section>
            <button
                className="px-2 rounded border border-yellow-700 hover:cursor-pointer"
                onClick={() => {
                    router.back();
                }}
            >
                Quay lại
            </button>
            <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl transform transition-all duration-500 hover:scale-105">
                    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 h-32 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <h1 className="relative text-white text-3xl font-bold tracking-wide z-10">Thông Tin Liên Hệ</h1>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-20 sm:-mt-24 mb-6">
                            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                                <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                                    {contact.NAME} {contact.LAST_NAME}
                                </h2>
                                <p className="text-lg text-gray-600">{contact.POST}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-3 9a1 1 0 110-2 1 1 0 010 2zm5-1a1 1 0 10-2 0 1 1 0 002 0zm3 1a1 1 0 110-2 1 1 0 010 2z"></path>
                                    </svg>
                                    Chi Tiết Cá Nhân
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <strong className="font-bold">Mã ID:</strong> {contact.ID}
                                    </li>
                                    <li>
                                        <strong className="font-bold">Ngày sinh:</strong> {contact.BIRTHDATE.slice(0, 10)}
                                    </li>
                                    <li>
                                        <strong className="font-bold">Ngân hàng:</strong>
                                        <div className="flex flex-col">
                                            {parseJson(contact['UF_CRM_CONTACT_BANK_DETAILS'])?.map((item: any, index: number) => (
                                                <React.Fragment key={index}>
                                                    {(item !== null || item != undefined || item != 'null' || item != 'undefined') && (
                                                        <div key={index} className="grid grid-cols-2">
                                                            <span>{`${item?.BANK_NAME || '' + ': '}`}</span>
                                                            <span>{`${item?.BANK_ACCOUNT || ''}`}</span>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18.966 8.874l-2.616-2.616a1 1 0 00-1.414 0l-1.336 1.336a1 1 0 00-.265.626l-.286 1.43a1 1 0 001.077 1.077l1.43-.286a1 1 0 00.626-.265l1.336-1.336a1 1 0 000-1.414zM12 11H7a1 1 0 00-1 1v4a1 1 0 001 1h5a1 1 0 001-1v-4a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Liên Hệ
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <strong className="font-bold">Email:</strong>
                                        <div className="flex flex-col">
                                            {contact['EMAIL'].map((item: any, index: number) => (
                                                <React.Fragment key={index}>
                                                    {(item !== null || item != undefined || item != 'null' || item != 'undefined') && (
                                                        <div key={index} className="grid grid-cols-2">
                                                            <span>{`${item?.VALUE_TYPE || '' + ': '}`}</span>
                                                            <span>{`${item?.VALUE || ''}`}</span>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </li>
                                    <li>
                                        <strong className="font-bold">Số điện thoại:</strong>
                                        <div className="flex flex-col">
                                            {contact['PHONE'].map((item: any, index: number) => (
                                                <React.Fragment key={index}>
                                                    {(item !== null || item != undefined || item != 'null' || item != 'undefined') && (
                                                        <div key={index} className="grid grid-cols-2">
                                                            <span>{`${item?.VALUE_TYPE || '' + ': '}`}</span>
                                                            <span>{`${item?.VALUE || ''}`}</span>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </li>
                                    <li>
                                        <strong className="font-bold">WEBSITE:</strong>
                                        <div className="flex flex-col">
                                            {parseJson(contact['UF_CRM_CONTACT_WEBSITES'])?.map((item: any, index: number) => (
                                                <React.Fragment key={index}>
                                                    {(item !== null || item != undefined || item != 'null' || item != 'undefined') && (
                                                        <div key={index}>
                                                            <span>{item}</span>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </li>
                                    <li>
                                        <strong className="font-bold">Địa chỉ:</strong> {contact.ADDRESS}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => {
                                        router.push(`${ROUTE.SITEMAP_LV3.edit.url}?ID=${id}`);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    Chỉnh sửa Thông tin
                                </button>
                            </div>
                            <div className="mt-8 text-center">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
                                >
                                    Xóa thông tin khách hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
