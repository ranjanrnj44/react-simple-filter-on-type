import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//library
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ATable() {
    //state
    let [datas, setDatas] = useState([]);
    let [data, setData] = useState('');


    //useEffect
    useEffect(() => {
        let apiCall = async () => {
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            let result = response.data;
            console.log(result);
            setDatas(result);
        }
        apiCall();
    }, []);

    //handleSearch
    // let handleSearch = (e) => {
    //     e.preventDefault();
    //     setData(e.target.value);
    // }

    return (
        <>
            {/* input and button */}
            <Box>
                <TextField onChange={(e) => setData(e.target.value)} variant="standard" label="Outlined secondary" color="warning" fullWidth />
            </Box>


            <br />

            {/* table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">ID</StyledTableCell>
                            <StyledTableCell>UserName</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Street</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas && datas.filter((item => {
                            return data.toLocaleLowerCase() === ''
                                ? item
                                : item.username.toLocaleLowerCase().includes(data);
                        })).map((item) => (
                            <StyledTableRow StyledTableRow key={item.id} >
                                <StyledTableCell align="center">{item.id}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {item.username}
                                </StyledTableCell>
                                <StyledTableCell align="left">{item.name}</StyledTableCell>
                                <StyledTableCell align="left">{item.email}</StyledTableCell>
                                <StyledTableCell align="left">{item?.address?.street}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    );
}