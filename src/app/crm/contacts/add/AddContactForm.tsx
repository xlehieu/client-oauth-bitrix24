'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ROUTE from '@/config/routes';
const AddContactForm = ({ onSubmit, isRedirect = true }: { onSubmit: any; isRedirect?: boolean }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<any>({
        NAME: '',
        LAST_NAME: '',
        EMAIL: {
            VALUE: '',
            VALUE_TYPE: 'WORK',
        },
        PHONE: {
            VALUE: '',
            VALUE_TYPE: 'WORK',
        },
        ADDRESS: '', // phường/xã, tên đường, số nhà
        ADDRESS_CITY: '', // quận/huyện
        ADDRESS_COUNTRY: '', // tỉnh/thành phố
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => {
            let newValue = { ...prev };
            if (['EMAIL', 'PHONE'].includes(name)) {
                newValue[name] = {
                    VALUE: value,
                    VALUE_TYPE: 'WORK',
                };
            }
            newValue[name] = value;
            return newValue;
        });
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(formData); // callback gửi data ra ngoài
        console.log('Contact Submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-5">
            <h2 className="text-2xl font-semibold text-gray-800">Thêm mới liên hệ</h2>

            <div>
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
                    value={formData.EMAIL.VALUE}
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
                    value={formData.PHONE.VALUE}
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
                    placeholder="Ví dụ: P. Bình Trị Đông B, 123 Lê Văn Quới"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Quận / Huyện</label>
                <input
                    name="ADDRESS_CITY"
                    value={formData.ADDRESS_CITY}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Ví dụ: Bình Tân"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Tỉnh / Thành phố</label>
                <input
                    name="ADDRESS_COUNTRY"
                    value={formData.ADDRESS_COUNTRY}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Ví dụ: TP. Hồ Chí Minh"
                />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
                Thêm liên hệ
            </button>
        </form>
    );
};

export default AddContactForm;
