import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { contract } from '../../Contract/ether';
import Swal from 'sweetalert2'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewAllLandInspector() {
    const [tableData, setTableData] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const callData = async () => {
            const data = await contract.ReturnAllUserList();
            for (let i = 0; i < data.length; i++) {
                const userData = await contract.UserMapping(data[i]);
                if (!userData.isUserVerified) {
                    const tableRow = { address: userData[0], name: userData[1], age: userData[2].toNumber(), city: userData[3], aadhar: userData[4], pan: userData[5], email: userData[7] };
                    setRows(prevArray => {
                        if (prevArray.some(obj => obj.address === tableRow.address)) {
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
            {
                tableData && <TableContainer component={Paper} style={{ margin: "60px 0" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Aadhar No.</TableCell>
                                <TableCell>Pan No.</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Verify</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.address}
                                    </TableCell>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.age}</TableCell>
                                    <TableCell>{row.city}</TableCell>
                                    <TableCell>{row.aadhar}</TableCell>
                                    <TableCell>{row.pan}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="verify" color="primary" onClick={async () => {
                                            try {
                                                await contract.verifyUser(row.address);
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'User verified Successfully',
                                                    text: `User with address ${row.address} verified successfully`,
                                                });
                                            } catch (err) {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: err.message,
                                                })
                                            }
                                        }}>
                                            <HowToRegIcon />
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