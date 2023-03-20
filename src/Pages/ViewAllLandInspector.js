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
import { contract } from '../Contract/ether';
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewAllLandInspector() {
    const [tableData, setTableData] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const callData = async () => {
            const data = await contract.ReturnAllLandIncpectorList();
            for (let i = 0; i < data.length; i++) {
                const inspectorData = await contract.InspectorMapping(data[i]);
                const tableRow = { name: inspectorData[2], address: inspectorData[1], age: inspectorData[3].toNumber(), designation: inspectorData[4], city: inspectorData[5] };
                // setRows(current => [...current, tableRow]);
                setRows(prevArray => {
                    if(prevArray.some(obj => obj.address === tableRow.address)){
                        return prevArray;
                    }
                    else{
                        return [...prevArray, tableRow];
                    }
                })
            }
            setTableData(true);
        }
        callData();
    }, [])

    return (
        <>
            {tableData === null && <div style={{ height: '500px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>}
            { tableData && <TableContainer component={Paper} style={{ margin: "60px 0" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell>City</TableCell>
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
                                {row.name}
                            </TableCell>
                            <TableCell>{row.age}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.designation}</TableCell>
                            <TableCell>{row.city}</TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" color="primary" onClick={async () => {
                                    try {
                                        await contract.removeLandInspector(row.address);
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Land Inspector Removed Successfully',
                                            text: `Land Inspector with address ${row.address} removed successfully`,
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