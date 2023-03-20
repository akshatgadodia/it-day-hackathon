import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { ButtonBase, Container } from '@material-ui/core';
import BgVideoSection from '../Components/BgVideoSection';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const styles = theme => ({
    appBar: {
        position: 'relative',
        background: '#003fba',
        display: "flex",

    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Home(props) {
    const { classes } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
                <Container>
                    <Toolbar class="topNav">
                        <img src="/img/cover.png" className='main-logo'></img>
                        {/* <ButtonBase className='connectWalletBtn'>
                            <img src="/img/rainbow.svg"/>
                            Connect Wallet
                        </ButtonBase> */}
                        {/* <ConnectButton className='connectWalletBtn'/> */}
                        <ConnectButton chainStatus="icon" accountStatus="avatar"/>
                    </Toolbar>
                </Container>
            </AppBar>
            <main className='bgVideoDiv'>
                {/* Hero unit */}
                {/* <BgVideoSection /> */}
                <div className={`${classes.heroUnit} heroSectionBg`}>
                    <div className={`${classes.heroContent} ftTxtDiv`}>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            BlockEstate
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Our Decentralized Land Registry System is a revolutionary platform that allows users to register and list their land in a secure and decentralized manner. With our Dapp, you can enjoy hassle-free land ownership and transfer that is completely transparent, secure, and efficient. We believe that this is the future of land ownership, and we are proud to be at the forefront of this technological revolution.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Register To BUY/SELL
                                    </Button>
                                </Grid>
                                {/* <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid> */}
                            </Grid>
                        </div>
                    </div>
                </div>
               
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                {/* <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography> */}
                {/* <small>Made in India with ❤️</small>
                <Typography  align="center" color="textSecondary">
                © Copyright 2023 Department of Information Technology & Communication.
All Rights Reserved
                </Typography> */}
                <div className='footerNotes'>
                    <small>Made in <b>INDIA</b> with ❤️</small>
                    <small>© Copyright 2023 Department of Information Technology & Communication. All Rights Reserved</small>
                </div>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);