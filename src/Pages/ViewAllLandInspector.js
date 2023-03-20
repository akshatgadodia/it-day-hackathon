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

export default function ViewAllLandInspector() {
    const [tableData, setTableData] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const callData = async () => {
            const data = await contract.ReturnAllLandIncpectorList();
            for (let i = 0; i < data.length; i++) {
                const inspectorData = await contract.InspectorMapping(data[i]);
                const tableRow = { name: inspectorData[2], address: inspectorData[1], designation: inspectorData[4], city: inspectorData[5] };
                setRows(current => [...current, tableRow]);
            }
            setTableData(true);
        }
        callData();
    }, [])

    return (
        tableData && <TableContainer component={Paper} style={{ margin: "60px 0" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Designation</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Action</TableCell>
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
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.designation}</TableCell>
                            <TableCell align="right">{row.city}</TableCell>
                            <TableCell align="right">
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
        </TableContainer>
    );
}