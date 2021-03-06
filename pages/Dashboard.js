import React, { useState, Fragment, useEffect } from 'react';
import firebase from '../components/utils/firebase'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';
import Router from 'next/router';
import Axios from 'axios';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    }
});

const MyToolbar = withStyles(styles)(
    ({ classes, title, onMenuClick }) => (
        <Fragment>
            <AppBar className={classes.aboveDrawer}>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.flex}
                    >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </Fragment>
    )
);

const MyDrawer = withStyles(styles)(
    ({ classes, variant, open, onClose, onItemClick }) => (
        <div>
            <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div
                    className={clsx({
                        [classes.toolbarMargin]: variant === 'persistent'
                    })}
                />
                <List>
                    <ListItem button component={Link} to="/dashboard1" onClick={onItemClick('Home')}>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard" onClick={onItemClick('Page 2')}>
                        <ListItemText>Page 2</ListItemText>
                    </ListItem>
                    <ListItem button onClick={onItemClick('page 3')}>
                        <ListItemText>Page 3</ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {
                        firebase.auth().signOut();
                        Router.push('/')
                    }}>
                        <ListItemText>Log Out</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
);

function AppBarInteraction({ classes, variant }) {
    const [drawer, setDrawer] = useState(false);
    const [title, setTitle] = useState('Home');
    const [data, setData] = useState('');

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const onItemClick = title => () => {
        setTitle(title);
        setDrawer(variant === 'temporary' ? false : drawer);
        setDrawer(!drawer);
    };
    useEffect(() => {
        Axios.get("http://dummy.restapiexample.com/api/v1/employees")
            .then(res => {
                console.log("response ", res);
                setData(res.data.data[0]);
            }
            )
    }, [])
    return (
        <div className={classes.root}>
            <h4 style={{marginTop:100}} >Data fetched from API endpoint using axios : {data.employee_name}</h4>
            <MyToolbar title={title} onMenuClick={toggleDrawer} />
            <MyDrawer
                open={drawer}
                onClose={toggleDrawer}
                onItemClick={onItemClick}
                variant={variant}
            />
        </div>
    );
}

export default withStyles(styles)(AppBarInteraction);