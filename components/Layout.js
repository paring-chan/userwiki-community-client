import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import {Container, createMuiTheme, fade, MuiThemeProvider, Toolbar, Typography} from "@material-ui/core";
import Link from "next/link";
import NextProgress from 'nextjs-progressbar'
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchIcon from '@material-ui/icons/Search'
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu'
import Router from "next/router";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HelpIcon from '@material-ui/icons/Help'
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: 4,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

const Layout = ({children}) => {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#3d3d3d'
            }
        }
    })

    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const classes = useStyles()

    return (
        <MuiThemeProvider theme={theme}>
            <NextProgress color="#fff"/>
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => setDrawerOpen(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Link href="/">
                        <Typography style={{
                            cursor: 'pointer'
                        }} className={classes.title} variant="h6">
                            UserWiki
                        </Typography>
                    </Link>
                    <div style={{flexGrow: 1}}/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder="검색"
                                   classes={{
                                       root: classes.inputRoot,
                                       input: classes.inputInput
                                   }} onKeyUp={e => {
                                       if (e.key === 'Enter') {
                                           if (e.target.value === '') return
                                           Router.push('/search/[text]', `/search/${encodeURIComponent(e.target.value)}`, {
                                               shallow: true
                                           })
                                       }
                        }}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <ListItem target="_blank" href="https://discord.gg/jAmzKWh" button component="a">
                    <ListItemIcon>
                        <HelpIcon/>
                    </ListItemIcon>
                    <ListItemText primary="공식 서버"/>
                </ListItem>
            </Drawer>
            <Toolbar style={{marginBottom: 20}}/>
            <Container>
                {children}
            </Container>
        </MuiThemeProvider>
    );
};

export default Layout;
