import React, { ChangeEvent, FC, useState } from 'react'
import Header from '../../components/layouts'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import { useClinicQuery } from '../../redux/api/clinics'
import { Avatar, Backdrop, Container, Pagination } from '@mui/material'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { GetDoctorDetailArg, useDoctorsQuery } from '../../redux/api/doctors';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useAppointmentQuery, useUpdateAppointmentMutation } from '../../redux/api/appointment';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "white",
        color: "black",
        fontWeight: "bold"
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


const Appointment = () => {
    const { data, isLoading } = useAppointmentQuery()
    const [appointment] = useUpdateAppointmentMutation()
    const history = useHistory();
    const handleChangeStatus = (id:number) => {
        appointment(
            {
                dateTime : new Date(),
                status : "cancelled",
                id : String(id) 
            }).then(() => {
                window.location.reload()
            })
    }
    return (
        <>
            <Backdrop
                sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            />
            <Header />
            <Container maxWidth={"xl"} style={{ marginTop: 15 }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Doctor</StyledTableCell>
                                <StyledTableCell >Clinik</StyledTableCell>
                                <StyledTableCell>Treatment</StyledTableCell>
                                <StyledTableCell >Status</StyledTableCell>
                                <StyledTableCell >Date</StyledTableCell>
                                <StyledTableCell >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data?.data?.map((row) => (
                                <StyledTableRow key={row.id} >
                              
                                    <StyledTableCell component="th" scope="row">
                                        {row.doctor.specialization}  {row.doctor.firstname}  {row.doctor.lastname}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.clinic.name} 
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.treatment.name}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.status}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.dateTime}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" >
                                        <Button
                                            color={ "error"}
                                            variant={"contained"}
                                            disabled={row.status === "cancelled"}
                                            onClick={() => handleChangeStatus(row.id) }
                                        >
                                            Cancel
                                        </Button>
                                    </StyledTableCell>
                                    {/* <StyledTableCell component="th"> {numberDigts(row.attributes.price)} {row.attributes.currency}</StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </>


    )
}

export default Appointment