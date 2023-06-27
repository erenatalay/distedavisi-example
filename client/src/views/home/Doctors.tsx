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
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  
const Doctors = () => {
    let { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<number>(1)
    let query = useQuery();
    const { data, isLoading } = useDoctorsQuery({ id, page })
    const history = useHistory();
    const onChangePagination = (event: ChangeEvent<unknown>, page: number) => {
        setPage(page)
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
                                <StyledTableCell >#</StyledTableCell>
                                <StyledTableCell >Specialization</StyledTableCell>
                                <StyledTableCell>Fullname</StyledTableCell>
                                <StyledTableCell >Phone</StyledTableCell>
                                <StyledTableCell >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data?.data?.results?.map((row) => (
                                <StyledTableRow key={row.id} >
                                    <StyledTableCell component="th" scope="row">
                                        <Avatar alt={row.firstname} src={row.image} />
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.specialization}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.firstname} {row.lastname}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.phone}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" >
                                        <Button
                                            color={"primary"}
                                            variant={"contained"}
                                            onClick={() => history.push(`/treatments/${row.id}?amount=${query.get("amount")}&clinic=${id}&doctor=${row.id}`)}
                                        >
                                            Select
                                        </Button>
                                    </StyledTableCell>
                                    {/* <StyledTableCell component="th"> {numberDigts(row.attributes.price)} {row.attributes.currency}</StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                            <Pagination count={data?.data?.totalPages} defaultValue={page} onChange={(event: ChangeEvent<unknown>, page: number) => onChangePagination(event, page)} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </>


    )
}

export default Doctors