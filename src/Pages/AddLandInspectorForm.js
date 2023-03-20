import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contract } from '../Contract/ether';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Swal from 'sweetalert2'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
          Block Estate
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

const AddLandInspectorForm = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try{
        const outputData = await contract.addLandInspector(data.get('address'), data.get('name'), data.get('age'), 
                            data.get('designation'), data.get('city'));
          Swal.fire({
            icon: 'success',
            title: 'Registered Successfully',
            text: `Tx Hash is ${outputData.hash}`,
          });
        }
        catch(err){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          })
        }
      };
    return (
        <div style={{padding:"40px 0"}}>
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
                            <PersonAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Land Inspector
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="address"
                                        name="address"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        autoFocus
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="age"
                                        label="Age"
                                        name="age"
                                        autoComplete="family-name"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="designation"
                                        label="Designation"
                                        name="designation"
                                        autoComplete="designation"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        name="city"
                                        autoComplete="city"
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
                                Add
                            </Button>
                            <Grid container justifyContent="flex-end">
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 1 }} />
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default AddLandInspectorForm