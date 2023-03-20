import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import VerifyLandsList from './LIsts/VerifyLandsList';
import VerifyUserList from './LIsts/VerifyUserList';
import TransferLandForm from './TransferLandForm';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class LandInpectorDashboard extends React.Component {
    state = {
        open: true,
        tab: 1,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    toggleTab = (e)=>{
        if(e.currentTarget.dataset.val){
            this.setState({ tab: e.currentTarget.dataset.val });
        }
    }

    render() {
        const { classes } = this.props;
        const componentArr=[<VerifyLandsList />, <VerifyUserList />,<TransferLandForm />]

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Land Inspector Dashboard
                        </Typography>

                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <div>
                            <ListSubheader inset>Admin Pannel</ListSubheader>
                            <ListItem button data-val="0" onClick={this.toggleTab}>
                                <ListItemIcon>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Verify User" />
                            </ListItem>
                            <ListItem button data-val="1" onClick={this.toggleTab}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Verify Land" />
                            </ListItem>
                            {/* <ListItem button data-val="2" onClick={this.toggleTab}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Transfer Ownership" />
                            </ListItem> */}
                        </div>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <Box>
                        {componentArr[this.state.tab]}
                    </Box>
                </main>
            </div>
        );
    }
}

LandInpectorDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandInpectorDashboard);