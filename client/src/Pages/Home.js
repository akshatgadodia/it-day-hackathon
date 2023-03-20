import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ModalBox from '../Components/ModalBox';

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

function Home(props) {
    const { classes } = props;
    const [openAddFormModal, setOpenAddFormModal] = useState(false);
    return (
        <React.Fragment>
            <ModalBox open={openAddFormModal} setOpen={setOpenAddFormModal} type="land-add" />
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
                <Container>
                    <Toolbar class="topNav">
                        <img src="/img/cover.png" className='main-logo' alt="logo" />
                        <ConnectButton chainStatus="icon" accountStatus="avatar" />
                    </Toolbar>
                </Container>
            </AppBar>
            <main className='bgVideoDiv'>
                {/* Hero unit */}
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
                                    <ConnectButton.Custom>
                                        {({
                                            account,
                                            chain,
                                            openAccountModal,
                                            openChainModal,
                                            openConnectModal,
                                            authenticationStatus,
                                            mounted,
                                        }) => {
                                            // Note: If your app doesn't use authentication, you
                                            // can remove all 'authenticationStatus' checks
                                            const ready = mounted;
                                            const connected =
                                                ready &&
                                                account &&
                                                chain;
                                            return (
                                                <div
                                                    {...(!ready && {
                                                        'aria-hidden': true,
                                                    })}
                                                >
                                                    {(() => {
                                                        if (!connected) {
                                                            return (
                                                                <Button onClick={openConnectModal} variant="contained" color="primary">
                                                                    Register To BUY/SELL
                                                                </Button>
                                                            );
                                                        }
                                                        if (chain.unsupported) {
                                                            return (
                                                                <Button onClick={openChainModal} variant="contained" color="primary">
                                                                    Wrong network
                                                                </Button>
                                                            );
                                                        }
                                                        return (
                                                            <Button variant="contained" color="primary" onClick={() => { setOpenAddFormModal(true) }}>
                                                                BUY/SELL Land
                                                            </Button>
                                                        );
                                                    })()}
                                                </div>
                                            );
                                        }}
                                    </ConnectButton.Custom>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>

            </main>
            {/* Footer */}
            <footer className={classes.footer}>
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