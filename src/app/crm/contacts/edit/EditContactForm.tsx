'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
const EditContactForm = ({
    onSubmit,
    titlePage,
    actionGetData,
    formData,
    setFormData,
    templateFormData,
}: {
    onSubmit: any;
    formData: any;
    titlePage?: string;
    actionGetData: string;
    templateFormData?: any;
    setFormData: (data: any) => void;
}) => {
    const searchParams = useSearchParams();
    const id = searchParams.get('ID');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputName?: string, idxInputConfig?: number, idxMultipleField?: number) => {
        const { name, value } = e.target;
        if (inputName && typeof idxInputConfig === 'number' && typeof idxMultipleField === 'number') {
            const index = formData.findIndex((item: any) => item.name === inputName);
            if (index === -1) return;
            const newValue = [...formData];
            newValue[index].inputConfig[idxInputConfig].multipleField[idxMultipleField].valueInput = value;
            setFormData(newValue);
        } else if (inputName && typeof idxInputConfig === 'number') {
            const index = formData.findIndex((item: any) => item.name === inputName);
            if (index === -1) return;
            const newValue = [...formData];
            newValue[index].inputConfig[idxInputConfig].valueInput = value;
            setFormData(newValue);
        } else {
            const newValue = [...formData];
            const index = newValue.findIndex((item: any) => item.name === name);
            if (index === -1) return;
            newValue[index].valueInput = value;
            setFormData(newValue);
        }
    };
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            formData.some(
                (item: any) =>
                    (item.type === 'text' && item.isRequired && !item.valueInput) ||
                    (item?.type === 'multipleField' &&
                        item?.inputConfig?.some((itemInputConfig: any) =>
                            itemInputConfig?.multipleField?.some(
                                (itemMultipleField: any) => itemMultipleField?.isRequired && !itemMultipleField?.valueInput,
                            ),
                        )),
            )
        ) {
            throw new Error('Vui lòng nhập đầy đủ thông tin');
        }

        let dataSubmit: any = {};
        formData.forEach((item: any) => {
            if (item.type === 'text') {
                dataSubmit = {
                    ...dataSubmit,
                    [item.name]: item.valueInput,
                };
            } else if (item.type === 'multipleField') {
                item.inputConfig.forEach((itemInputConfig: any) => {
                    if (itemInputConfig?.multipleField?.[0]?.valueInput || itemInputConfig?.multipleField?.[1]?.valueInput)
                        dataSubmit = {
                            ...dataSubmit,
                            [item.name]: [
                                ...(dataSubmit[item.name] || []),
                                {
                                    ID: itemInputConfig.ID || '',
                                    [itemInputConfig.multipleField[0].value]: itemInputConfig.multipleField[0].valueInput || '',
                                    [itemInputConfig.multipleField[1].value]: itemInputConfig.multipleField[1].valueInput || '',
                                },
                            ],
                        };
                    else if (itemInputConfig?.valueInput) {
                        dataSubmit = {
                            ...dataSubmit,
                            [item.name]: [...(dataSubmit[item.name] || []), itemInputConfig.valueInput],
                        };
                    }
                });
            }
        });
        if (templateFormData)
            Object.entries(templateFormData).forEach(([key, value]: any) => {
                if (key in dataSubmit) {
                    if (Array.isArray(value) && value.length > 0) {
                        value.forEach((item: any) => {
                            const findData = dataSubmit[key].some((itemDataSubmitKey: any) => item.ID === itemDataSubmitKey.ID && !item.DELETE);
                            if (!findData) {
                                dataSubmit[key].push({
                                    ID: item.ID,
                                    DELETE: 'Y',
                                });
                            }
                        });
                    }
                }
            });
        onSubmit?.(id, dataSubmit); // callback gửi data ra ngoài
        // console.log('Contact Submitted:', dataSubmit);
    };
    const handleAddField = (e: React.ChangeEvent<HTMLFormElement>, { name }: any) => {
        e.preventDefault();
        const newValue = [...formData];
        const index = newValue.findIndex((item: any) => item.name === name);
        if (index === -1) return;
        const newInputConfig: any = { ...newValue[index] };
        const newField = Object.assign(newInputConfig?.inputConfig?.[0], {});
        if (!newField?.multipleField) {
            newValue[index].inputConfig = [...newInputConfig.inputConfig, { ...newField, valueInput: '' }];
            return setFormData(newValue);
        } else {
            newValue[index].inputConfig = [
                ...newInputConfig.inputConfig,
                {
                    ...newField,
                    ID: '',
                    multipleField: [
                        { ...newField.multipleField[0], valueInput: '' },
                        { ...newField.multipleField[1], valueInput: '' },
                    ],
                },
            ];
            return setFormData(newValue);
        }
    };
    const handleRemoveField = (e: React.ChangeEvent<HTMLFormElement>, { name, indexRemove }: any) => {
        e.preventDefault();
        const newValue = [...formData];
        const index = newValue.findIndex((item: any) => item.name === name);
        if (index === -1) return;
        newValue[index].inputConfig.splice(indexRemove, 1);
        return setFormData(newValue);
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
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-5">
            <h2 className="text-2xl font-semibold text-gray-800">{titlePage}</h2>
            {Array.isArray(formData) &&
                formData?.length > 0 &&
                formData.map((inputCf, index) => (
                    <React.Fragment key={index}>
                        {inputCf?.type === 'multipleField' ? (
                            <div>
                                {Array.isArray(inputCf.inputConfig) &&
                                    inputCf.inputConfig.length > 0 &&
                                    inputCf.inputConfig.map((itemInputCfMultiple: any, indexInputCf: number) => (
                                        <React.Fragment key={indexInputCf}>
                                            {Array.isArray(itemInputCfMultiple?.multipleField) && itemInputCfMultiple?.multipleField ? (
                                                <div
                                                    className={`grid gap-4 ${inputCf.inputConfig.length > 1 ? 'grid-cols-9' : 'grid-cols-2'}`}
                                                    key={indexInputCf + 'itemInputCfMultiple'}
                                                >
                                                    <div className={`${inputCf.inputConfig.length > 1 ? 'col-span-4' : 'col-span-1'}`}>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            {itemInputCfMultiple?.multipleField?.[0]?.title || ''}
                                                        </label>
                                                        <input
                                                            required={
                                                                itemInputCfMultiple?.multipleField?.[0]?.isRequired ||
                                                                itemInputCfMultiple?.isRequired ||
                                                                false
                                                            }
                                                            name={String(indexInputCf) + (inputCf?.name || '') + '0'}
                                                            value={itemInputCfMultiple?.multipleField?.[0]?.valueInput}
                                                            onChange={(e) => handleChange(e, inputCf?.name, indexInputCf, 0)}
                                                            className="w-full border rounded px-3 py-2 mt-1"
                                                            placeholder={
                                                                itemInputCfMultiple?.multipleField?.[0]?.placeholder ||
                                                                'Nhập' + itemInputCfMultiple?.multipleField?.[0]?.title ||
                                                                ''
                                                            }
                                                        />
                                                    </div>
                                                    <div className={`${inputCf.inputConfig.length > 1 ? 'col-span-4' : 'col-span-1'}`}>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            {itemInputCfMultiple?.multipleField?.[1]?.title || ''}
                                                        </label>
                                                        <input
                                                            required={
                                                                itemInputCfMultiple?.multipleField?.[1]?.isRequired ||
                                                                itemInputCfMultiple?.isRequired ||
                                                                false
                                                            }
                                                            name={String(indexInputCf) + (inputCf?.name || '') + '1'}
                                                            value={itemInputCfMultiple?.multipleField?.[1]?.valueInput}
                                                            onChange={(e) => handleChange(e, inputCf?.name, indexInputCf, 1)}
                                                            className="w-full border rounded px-3 py-2 mt-1"
                                                            placeholder={
                                                                itemInputCfMultiple?.multipleField?.[1]?.placeholder ||
                                                                'Nhập ' + itemInputCfMultiple?.multipleField?.[1]?.title ||
                                                                ''
                                                            }
                                                        />
                                                    </div>
                                                    {inputCf.inputConfig.length > 1 && (
                                                        <button
                                                            key={index + 'addField'}
                                                            onClick={(e) =>
                                                                handleRemoveField(e as any, { name: inputCf.name, indexRemove: indexInputCf })
                                                            }
                                                            className="text-sm border border-red-500 rounded px-2 hover:cursor-pointer mt-9 h-5 min-w-16"
                                                        >
                                                            Xóa
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <React.Fragment key={index + 'itemInputCfMultiple'}>
                                                    <div className="flex">
                                                        <div className={`flex-1 ${inputCf.inputConfig.length > 1 && 'mr-4'}`}>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                {itemInputCfMultiple?.title}
                                                            </label>
                                                            <input
                                                                name={itemInputCfMultiple?.name + String(indexInputCf)}
                                                                value={itemInputCfMultiple?.valueInput}
                                                                onChange={(e) => handleChange(e, inputCf.name, indexInputCf)}
                                                                className="w-full border rounded px-3 py-2 mt-1"
                                                                placeholder={
                                                                    itemInputCfMultiple?.placeholder || 'Nhập ' + (itemInputCfMultiple?.title || '')
                                                                }
                                                                required={itemInputCfMultiple?.isRequired || false}
                                                            />
                                                        </div>
                                                        {inputCf.inputConfig.length > 1 && (
                                                            <button
                                                                key={index + 'addField'}
                                                                onClick={(e) =>
                                                                    handleRemoveField(e as any, { name: inputCf.name, indexRemove: indexInputCf })
                                                                }
                                                                className="text-sm border border-red-500 rounded px-2 hover:cursor-pointer mt-9 h-5 min-w-16"
                                                            >
                                                                Xóa
                                                            </button>
                                                        )}
                                                    </div>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                <button
                                    key={index + 'addField'}
                                    onClick={(e) => handleAddField(e as any, { name: inputCf.name })}
                                    className="text-sm border border-amber-500 rounded px-2 hover:cursor-pointer mt-1"
                                >
                                    Thêm
                                </button>
                            </div>
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
                                        required={inputCf?.isRequired || false}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
                Cập nhật
            </button>
        </form>
    );
};

export default EditContactForm;
