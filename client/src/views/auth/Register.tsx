import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLoginMutation, useRegisterMutation } from '../../redux/api/auth';
import { useHistory, Link } from 'react-router-dom';
import { RegisterRequest } from '../../@types/request/RegisterRequest';

const theme = createTheme();

const Register = () => {
  const [registerData, setRegister] = useState<RegisterRequest>({} as RegisterRequest)
  const [register] = useRegisterMutation()
  const handleChange = ({ target: { name, value } }: any) => {
    setRegister({
      ...registerData,
      [name]: value,
    })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(registerData)
  };

  return (
    <ThemeProvider theme={theme}>
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

          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              onChange={handleChange}
              label="Firstname"
              name="firstname"
              value={registerData.firstname}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              onChange={handleChange}
              label="Lastname"
              name="lastname"
              value={registerData.lastname}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="birthday"
              onChange={handleChange}
              label="Birthday"
              value={registerData.birthday}
              type="date"
              id="birthday"
              autoFocus
            />
         
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={handleChange}
              label="Email Address"
              name="email"
              value={registerData.email}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              value={registerData.password}

            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              onChange={handleChange}
              label="Confirm password"
              type="password"
              id="confirm_password"
              value={registerData.confirm_password}

            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/"  >
                  {"Do you already have a user"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;