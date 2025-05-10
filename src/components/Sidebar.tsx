import { Autocomplete, Card, CardContent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postService } from '@/services/post.services';
import { userService } from '@/services/user.services';
import { setUserId } from '@/store/sidebarSlice';
import { I_User } from '@/types/user.interface';

export default function Sidebar({
    setMessage,
    setOpenToast,
}: {
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [options, setOptions] = useState<{ label: string; id: string }[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await userService.getUsers();
                const data = response.data.map((user: I_User) => ({
                    label: user.name,
                    id: user.id,
                }));
                setOptions(data);
                setMessage(response.message);
                setOpenToast(true);
            } catch {
                setMessage('Loi khi lay du lieu!');
                setOpenToast(true);
            }
        };
        fetchApi();
    }, []);

    const handleOnChangeSelect = async (
        event: React.SyntheticEvent,
        value: {
            label: string;
            id: string;
        } | null,
        reason: string,
    ) => {
        if (reason === 'clear') {
            dispatch(setUserId(''));
            return;
        }
        if (!value?.id) return;
        try {
            dispatch(setUserId(value.id));
            const response = await postService.getPostsByUserId(value?.id);
            setMessage(response.message);
            setOpenToast(true);
        } catch {
            setMessage('Loi khi lay du lieu!');
            setOpenToast(true);
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                height: 'calc(100vh - 86px)',
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                position: 'sticky',
                top: 76,
            }}
        >
            <CardContent>
                <h1 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Filter</h1>

                <Autocomplete
                    disablePortal
                    options={options}
                    onChange={handleOnChangeSelect}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="User"
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                    )}
                />
            </CardContent>
        </Card>
    );
}
