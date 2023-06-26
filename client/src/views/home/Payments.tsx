import { Backdrop, Box, Button, Card, Container, CssBaseline, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../components/layouts'
import { PaymentRequest } from '../../@types/request/PaymentRequest'
import { useHistory, useLocation } from 'react-router-dom';
import { usePaymentMutation } from '../../redux/api/payment';
import { useCreateAppointmentMutation } from '../../redux/api/appointment';
function cc_format(value: string) {
    const v = value
        ?.replace(/\s+/g, "")
        ?.replace(/[^0-9]/gi, "")
        ?.substr(0, 16);
    const parts = [];

    for (let i = 0; i < v?.length; i += 4) {
        parts?.push(v.substr(i, 4));
    }

    return parts?.length > 1 ? parts?.join(" ") : value;
}

const handleMMYYYY = (text: string) => {
    let formated = text;
    if (formated?.length == 2) {
        //formated = text +'/';
        if (formated.indexOf('/') == -1) {
            formated = text + '/';
        }

    }
    return formated;
}
const Payments = () => {
    const [payment] = usePaymentMutation();
    const [createAppointment] = useCreateAppointmentMutation()
    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    const [cardData, setCard] = useState<PaymentRequest>({} as PaymentRequest)
    const [dateTime, setDate] = useState<Date>(new Date())
    const history = useHistory()
    let query = useQuery();
    const handleChange = ({ target: { name, value } }: any) => {
        setCard({
            ...cardData,
            [name]: value,
        })
    }

    const handleChangeDate = ({ target: { name, value } }: any) => {
        setDate(value)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        payment({
            ...cardData,
            amount,
            treatment: Number(query.get("treatment")),
            clinic: Number(query.get("clinic")),
        }).then((res: any) => {
            const paymentId = res.data.data.id
            createAppointment({
                treatment: Number(query.get("treatment")),
                clinic: Number(query.get("clinic")),
                doctor: Number(query.get("doctor")),
                payment: Number(paymentId),
                dateTime: dateTime
            }).then(() => {
                alert("appointment created successfully")
                window.location.href = "/#/appointment"

            })
        }).catch((error) => {
            window.alert(error.data.error.message);
        })
    };
    const amount = String((100 / Number(query.get("commission"))) * Number(query.get("price")))
    return (
        <>
            <Backdrop
                sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={false}
            />
            <Header />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >


                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="dateTime"
                        onChange={handleChangeDate}
                        label="Appointment Date"
                        value={dateTime}
                        type="datetime-local"
                        id="birthday"
                        autoFocus
                    />

                    <Typography component="h1" variant="h5">
                        Payment
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cardHolderName"
                            onChange={handleChange}
                            label="Holder Name"
                            name="cardHolderName"
                            value={cardData.cardHolderName}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cardNumber"
                            onChange={handleChange}
                            type="numeric"
                            label="Card Number"
                            name="cardNumber"
                            value={cc_format(cardData.cardNumber)}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="cardExpirationDate"
                            onChange={handleChange}
                            label="Expiration Date"
                            value={handleMMYYYY(cardData.cardExpirationDate)}
                            id="cardExpirationDate"
                            inputProps={{ maxLength: 5 }}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cardCVV"
                            onChange={handleChange}
                            label="CVV"
                            name="cardCVV"
                            value={cardData.cardCVV}
                            inputProps={{ maxLength: 3 }}

                        />

                        <h2>Total : {amount}TL</h2>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Pay
                        </Button>

                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Payments