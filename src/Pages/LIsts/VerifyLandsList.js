import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { contract } from '../../Contract/ether';
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewAllLandInspector() {
    const [tableData, setTableData] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const callData = async () => {
            const data = await contract.ReturnAllLandList();
            for (let i = 0; i < data.length; i++) {
                const landData = await contract.Lands(data[i].toNumber());
                const tableRow = { id: landData[0].toNumber(), area: landData[1].toNumber(), landAddress: landData[2], price: landData[3].toNumber(), latlon: landData[4], pid: landData[5].toNumber(), surveyNo: landData[6], verified: landData[10] };
                if (!tableRow.verified) {
                    setRows(prevArray => {
                        if (prevArray.some(obj => obj.id === tableRow.id)) {
                            return prevArray;
                        }
                        else {
                            return [...prevArray, tableRow];
                        }
                    })
                }
            }
            setTableData(true);
        }
        callData();
    }, [])

    return (
        <>
            {tableData === null && <div style={{ height: '500px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>}
            {tableData && <TableContainer component={Paper} style={{ margin: "60px 0" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Land Area</TableCell>
                            <TableCell>Land Address</TableCell>
                            <TableCell>Land Price</TableCell>
                            <TableCell>Latitude & Longitude</TableCell>
                            <TableCell>Property PID</TableCell>
                            <TableCell>Survey No</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.area}
                                </TableCell>
                                <TableCell>{row.landAddress}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.latlon}</TableCell>
                                <TableCell>{row.pid}</TableCell>
                                <TableCell>{row.surveyNo}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="verify land" color="primary" onClick={async () => {
                                        try {
                                            await contract.verifyLand(row.id);
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Land Verified Successfully',
                                                text: `Land with id ${row.id} verified successfully`,
                                            });
                                        } catch (err) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: err.message,
                                            })
                                        }
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>

    );
}