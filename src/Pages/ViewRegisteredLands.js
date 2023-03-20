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
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import { contract } from '../Contract/ether';
import { useAccount } from 'wagmi'
import CircularProgress from '@mui/material/CircularProgress';
const ViewRegisteredLands = () => {
    const { address, isConnected } = useAccount()
    const [tableData, setTableData] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const callData = async () => {
            const data = await contract.myAllLands(address);
            for (let i = 0; i < data.length; i++) {
                const landData = await contract.Lands(data[i]);
                const tableRow = { area: landData[1].toNumber(), landAddress: landData[2], price: landData[3].toNumber(), latlon: landData[4], pid: landData[5].toNumber(), surveyNo: landData[6], verified: landData[10].toString() };
                setRows(prevArray => {
                    if(prevArray.some(obj => obj.pid === tableRow.pid)){
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
    }, [isConnected])

    return (
        <div style={{margin:'0', padding: '0'}}>
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
                {tableData===null && <div style={{height:'500px', width:'500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></div>}
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
                                <TableCell>Verified Status</TableCell>
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
                                    <TableCell>{row.verified}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </div>
        </div>
    )
}

export default ViewRegisteredLands