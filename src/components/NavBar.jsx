import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useMediaQuery } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars, faCircleUser, faFileLines,
    faRobot,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const drawerWidth = 240;

const NavBar = (props) => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const Icons = [faFileLines, faCircleUser];
    const Links = ['Project', 'About Me'];
    const LinksPath = ['https://github.com/sureshpilli97/robot-fleet-monitoring-dashboard-frontend', 'https://www.linkedin.com/in/suresh-pilli-783555254/'];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Divider />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            style={{ textAlign: 'center', marginTop: 45 }}
        >
            {Links.map((text, index) => (
                <MenuItem key={text} onClick={handleMenuClose}>
                    <a href={LinksPath[index]} id='nav-links'
                    >
                        <FontAwesomeIcon icon={Icons[index]} style={{ height: '1.5em' }} />
                        <>{text}</>
                    </a>
                </MenuItem>
            ))}
        </Menu>
    );

    const isMobile = useMediaQuery('(max-width:499px)');

    return (
        <>
            <Box sx={{ display: 'flex' }} className='nav'>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar component="nav" className='nav' style={{ backgroundColor: '#111' }}>
                        <Toolbar>
                            <div className='nav-logo'>
                                <FontAwesomeIcon icon={faRobot} style={{ height: '2rem' }} />
                                <h1>Robot Fleet Monitoring Dashboard</h1>
                            </div>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'flex', md: 'flex', margin: 0 } }} id='nav-items' >
                                {isMobile ? (
                                    <IconButton
                                        size="large"
                                        aria-label="show more"
                                        aria-controls={mobileMenuId}
                                        aria-haspopup="true"
                                        onClick={handleMobileMenuOpen}
                                        color="inherit"
                                    >
                                        {isMobileMenuOpen ? (
                                            <FontAwesomeIcon icon={faXmark} />
                                        ) : (
                                            <FontAwesomeIcon icon={faBars} />
                                        )}
                                    </IconButton>
                                ) : (
                                    <>
                                        {Links.map((text, index) => (
                                            <IconButton size="small" color="inherit" key={index}>
                                                <a href={LinksPath[index]} id='nav-links'
                                                >
                                                    <FontAwesomeIcon icon={Icons[index]} style={{ height: '1.5em' }} />
                                                    <>{text}</>
                                                </a>
                                            </IconButton>
                                        ))}
                                    </>
                                )}
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                    <nav>
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </nav>
                </React.Fragment>
            </Box>
        </>
    );
}

export default NavBar;
