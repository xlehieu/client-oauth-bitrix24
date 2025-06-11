const parseJson = (dataRow: string): any => {
    try {
        const jsonDataRowParse = JSON.parse(dataRow);
        if (jsonDataRowParse) return jsonDataRowParse;
        return dataRow;
    } catch (err) {
        return dataRow;
    }
};

const utils = {
    parseJson,
};
export default utils;
