'use client';

import {
    alpha,
    AppBar,
    Avatar,
    Box,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const settings = [
    {
        name: 'Profile',
        href: '/profile',
    },
    {
        name: 'Manage',
        href: '/manage',
    },
    { name: 'Log out', href: '/logout' },
];

export default function Header() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    className="flex w-full items-center justify-between"
                >
                    <p className="flex-1/3">Social Media App</p>
                    <Search className="flex-1/3">
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 0 }} className="flex-1/3 flex justify-end">
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={(event: React.MouseEvent<HTMLElement>) => {
                                    console.log(event.currentTarget);
                                    setAnchorElUser(event.currentTarget);
                                }}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    onClick={() => setAnchorElUser(null)}
                                    href={setting.href}
                                    component="a"
                                >
                                    <Typography sx={{ textAlign: 'center' }}>
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
