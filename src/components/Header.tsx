'use client';

import {
    alpha,
    AppBar,
    Avatar,
    Box,
    IconButton,
    InputBase,
    Link,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';

import Toast from './ui/toast';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/store/authSlice';
import { useLogout } from '@/hooks/auth.hook';
import { setHeaderSearch } from '@/store/headerSlice';
import LoadingPage from './ui/loadingPage';
const settings = [
    {
        name: 'Profile',
        href: '/profile',
    },
    {
        name: 'Manage',
        href: '/manage',
    },
];

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

export default function Header() {
    const [message, setMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth);

    const {
        mutate: logout,
        data: responseLogout,
        isSuccess: successLogout,
        isError: errorLogout,
        isPending: pendingLogout,
    } = useLogout();

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setHeaderSearch(search));
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [search, dispatch]);

    useEffect(() => {
        if (successLogout && responseLogout) {
            dispatch(clearUser());
            router.push('/login');
        }

        if (errorLogout) {
            setMessage('Logout failed!');
            setOpenToast(true);
        }
    }, [successLogout, responseLogout, dispatch, router, errorLogout]);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    className="flex w-full items-center justify-between"
                >
                    <Box className="flex-1/3">
                        <Link
                            href="/"
                            sx={{ textDecoration: 'none', fontSize: '1.5rem', color: 'white' }}
                        >
                            Social Media App
                        </Link>
                    </Box>
                    <Search className="flex-1/3">
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 0 }} className="flex-1/3 flex justify-end">
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={(event: React.MouseEvent<HTMLElement>) => {
                                    setAnchorElUser(event.currentTarget);
                                }}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="Remy Sharp" src={user.avatar} />
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
                            {user.id &&
                                settings.map((setting) => (
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
                            {user.id ? (
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <Typography>Logout</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    onClick={() => setAnchorElUser(null)}
                                    href="/login"
                                    component="a"
                                >
                                    <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <Toast
                        openToast={openToast}
                        setOpenToast={setOpenToast}
                        message={message}
                        horizontal="right"
                        vertical="bottom"
                    />
                    {pendingLogout && <LoadingPage />}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
