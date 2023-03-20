import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HouseIcon from '@mui/icons-material/House';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contract } from '../Contract/ether';
import Swal from 'sweetalert2'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function UserRegistrationForm(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try{
    const outputData = await contract.addLand(data.get('area'), data.get('address'), data.get('landprice'), 
                        data.get('longilatti'), data.get('propertyPID'), data.get('surveyNo'), data.get('name'));
      Swal.fire({
        icon: 'success',
        title: 'Registered Successfully',
        text: `Tx Hash is ${outputData.hash}`,
      });
      props.handleClose();
    }
    catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
      props.handleClose();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HouseIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Land
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="area"
                  name="area"
                  required
                  fullWidth
                  id="area"
                  label="Area"
                  autoFocus
                  size="small"
                />
              </Grid>
              
              <Grid item xs={5}>
                <TextField
                  required
                  fullWidth
                  id="landPrice"
                  label="Price"
                  name="landprice"
                  autoComplete="landprice"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="longilatti"
                  label="Longitude & Lattitude"
                  name="longilatti"
                  autoComplete="longilatti"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="surveyNo"
                  label="Survey No"
                  name="surveyNo"
                  autoComplete="surveyNo"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="propertyPID"
                  label="Property PID"
                  name="propertyPID"
                  autoComplete="propertyPID"
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Document Name"
                  type="text"
                  id="name"
                  autoComplete="name"
                  size="small"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Land
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 1 }} />
      </Container>
    </ThemeProvider>
  );
}