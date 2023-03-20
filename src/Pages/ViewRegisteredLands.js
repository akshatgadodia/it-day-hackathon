import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Container } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import IconButton from '@mui/material/IconButton';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import { contract } from '../Contract/ether';
import Swal from 'sweetalert2'
import { useAccount } from 'wagmi'

const ViewRegisteredLands = () => {
    const { address, isConnected } = useAccount()
    const [tableData, setTableData] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const callData = async () => {
            const data = await contract.ReturnAllLandIncpectorList(address);
            for (let i = 0; i < data.length; i++) {
                const inspectorData = await contract.InspectorMapping(data[i]);
                const tableRow = { name: inspectorData[2], address: inspectorData[1], designation: inspectorData[4], city: inspectorData[5] };
                setRows(current => [...current, tableRow]);
            }
            setTableData(true);
        }
        callData();
    }, [isConnected])

    return (
        <div>
            <AppBar position="static" style={{ background: "#003fba" }}>
                <Container>
                    <Toolbar class="topNav">
                        <img src="/cover.png" className='main-logo' alt="logo" />
                        <Button aria-label="delete" color="secondary">
                            <NavLink
                                className="navbar-item"
                                activeClassName="is-active"
                                style={{ color: '#fff' }}
                                to="/"
                            >
                                Back to Home Page
                            </NavLink>
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <div>
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
            </div>
        </div>
    )
}

export default ViewRegisteredLands