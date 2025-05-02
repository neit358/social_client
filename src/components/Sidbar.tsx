import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postService } from '@/services/post.services';
import { userService } from '@/services/user.services';
import { setUserId } from '@/store/sidebarSlice';
import { I_User } from '@/types/user';

export default function Sidebar({
    setMessage,
    setTurnOn,
}: {
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setTurnOn: React.Dispatch<React.SetStateAction<boolean>>;
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
                setTurnOn(true);
                setTimeout(() => {
                    setTurnOn(false);
                    setMessage('');
                }, 3000);
            } catch {
                setMessage('Loi khi lay du lieu!');
                setTurnOn(true);
                setTimeout(() => {
                    setTurnOn(false);
                    setMessage('');
                }, 3000);
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
            setTurnOn(true);
            setTimeout(() => {
                setTurnOn(false);
                setMessage('');
            }, 3000);
        } catch {
            setMessage('Loi khi lay du lieu!');
            setTurnOn(true);
            setTimeout(() => {
                setTurnOn(false);
                setMessage('');
            }, 3000);
        }
    };

    return (
        <Autocomplete
            disablePortal
            options={options}
            renderInput={(params) => <TextField {...params} label="User" />}
            className="w-full"
            onChange={handleOnChangeSelect}
        />
    );
}
