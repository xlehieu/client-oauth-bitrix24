import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}
export type HeadCell = {
    id: string;
    label: string;
    isHide: boolean;
};
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableCF({ headCells, rows, pageSize }: { headCells: HeadCell[]; rows: any[]; pageSize: number }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headCells
                            .filter((item) => !item.isHide)
                            .map((headCell) => (
                                <TableCell key={headCell.id} align="right">
                                    {headCell.label}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, indexRow) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {headCells
                                .filter((item) => !item.isHide)
                                .map((itemHead, indexHead) => {
                                    return (
                                        <>
                                            {Array.isArray(row[itemHead.id]) ? (
                                                <TableCell key={`${row.ID} +${indexHead}`} align="right">
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
