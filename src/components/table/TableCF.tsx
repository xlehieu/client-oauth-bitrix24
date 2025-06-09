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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}
export type HeadCell = {
    id: string;
    label: string;
    isHide: boolean;
    style?: any;
};

export default function TableCF({ headCells, rows, pageSize }: { headCells: HeadCell[]; rows: any[]; pageSize: number }) {
    const router = useRouter();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headCells
                            .filter((item) => !item.isHide)
                            .map((headCell) => (
                                <TableCell key={headCell.id} align="center" className="min-w-48" style={headCell.style}>
                                    {headCell.label}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, indexRow) => (
                        <TableRow
                            key={row.name}
                            onClick={() => router.push(`${ROUTE.SITEMAP_LV3.detail.url}?ID=${row?.ID}`)}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {headCells
                                .filter((item) => !item.isHide)
                                .map((itemHead, indexHead) => {
                                    return (
                                        <>
                                            {Array.isArray(row[itemHead.id]) ? (
                                                <TableCell key={`${row.ID} +${indexHead}`} align="left">
                                                    <div className="flex flex-col">
                                                        {row[itemHead.id].map((item: any, index: number) => (
                                                            <>
                                                                {item !== null || item != undefined || item != 'null' || item != 'undefined' ? (
                                                                    <div key={index} className="flex flex-row">
                                                                        <span className="w-1/2">{`${item?.VALUE_TYPE || '' + ': '}`}</span>
                                                                        <span className="w-1/2">{`${item?.VALUE || ''}`}</span>
                                                                    </div>
                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                            </>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                            ) : (
                                                <TableCell key={`${row.ID} +${indexHead}`} align="right">
                                                    {row[itemHead.id] != null || row[itemHead.id] != undefined ? String(row[itemHead.id]) : ''}
                                                </TableCell>
                                            )}
                                        </>
                                    );
                                })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
