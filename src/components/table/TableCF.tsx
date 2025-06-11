import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/navigation';
import ROUTE from '@/config/routes';

export type HeadCell = {
    id: string;
    label: string;
    isHide: boolean;
    style?: any;
};

export default function TableCF({
    headCells,
    rows,
    pageSize,
    urlDetail,
}: {
    urlDetail?: string;
    headCells: HeadCell[];
    rows: any[];
    pageSize: number;
}) {
    const router = useRouter();
    const parseJson = (dataRow: string): any => {
        try {
            const jsonDataRowParse = JSON.parse(dataRow);
            if (jsonDataRowParse) return jsonDataRowParse;
            return dataRow;
        } catch (err) {
            return dataRow;
        }
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headCells
                            .filter((item) => !item.isHide)
                            .map((headCell) => (
                                <TableCell key={headCell.id} align="center" style={headCell.style}>
                                    {headCell.label}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, indexRow) => (
                        <TableRow
                            key={row.name + String(indexRow)}
                            onClick={() => router.push(`${urlDetail}?ID=${row?.ID}`)}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="hover:cursor-pointer"
                        >
                            {headCells
                                .filter((item) => !item.isHide)
                                .map((itemHead, indexHead) => {
                                    return (
                                        <React.Fragment key={indexHead}>
                                            {Array.isArray(row[itemHead.id]) ? (
                                                <TableCell key={`${row.ID} +${indexHead}`} align="center">
                                                    <div className="flex flex-col">
                                                        {row[itemHead.id].map((item: any, index: number) => (
                                                            <React.Fragment key={index}>
                                                                {item !== null || item != undefined || item != 'null' || item != 'undefined' ? (
                                                                    <div key={index} className="grid grid-cols-2">
                                                                        <span className="text-right pr-2">{`${(item?.VALUE_TYPE || '') + ':'}`}</span>
                                                                        <span className="text-left">{`${item?.VALUE || ''}`}</span>
                                                                    </div>
                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                            ) : (
                                                <TableCell key={`${row.ID} +${indexHead}`} align="center">
                                                    {row[itemHead.id] != null || row[itemHead.id] != undefined ? (
                                                        <React.Fragment>
                                                            {Array.isArray(parseJson(String(row[itemHead.id]))) ? (
                                                                <React.Fragment>
                                                                    {/*  */}
                                                                    {parseJson(String(row[itemHead.id])).map((item: any, index: number) => (
                                                                        <React.Fragment key={String(index) + String(indexRow)}>
                                                                            {typeof item === 'object' ? (
                                                                                <div key={index} className="grid grid-cols-2">
                                                                                    {Object.entries(item).map(([key, value], indexKey) => (
                                                                                        <React.Fragment key={index + indexKey}>
                                                                                            {key !== 'ID' && (
                                                                                                <span className="text-left">
                                                                                                    {String(value) || ''}
                                                                                                </span>
                                                                                            )}
                                                                                        </React.Fragment>
                                                                                    ))}
                                                                                </div>
                                                                            ) : (
                                                                                <div>{item}</div>
                                                                            )}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </React.Fragment>
                                                            ) : (
                                                                <div>{String(row[itemHead.id])}</div>
                                                            )}
                                                        </React.Fragment>
                                                    ) : (
                                                        ''
                                                    )}
                                                </TableCell>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
