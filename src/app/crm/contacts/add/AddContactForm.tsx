import React, { useState } from 'react';

const AddContactForm = ({ onSubmit }: { onSubmit: any }) => {
    const [formData, setFormData] = useState({
        NAME: '',
        LAST_NAME: '',
        EMAIL: '',
        PHONE: '',
        ADDRESS: '', // phường/xã, tên đường, số nhà
        ADDRESS_CITY: '', // quận/huyện
        ADDRESS_COUNTRY: '', // tỉnh/thành phố
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
                    value={formData.EMAIL}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="example@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                    name="PHONE"
                    value={formData.PHONE}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="Nhập số điện thoại"
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
