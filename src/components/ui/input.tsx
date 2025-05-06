import { Box, FilledInput, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export default function Input({
    type,
    placeholder,
    register,
    errors,
    disabled = false,
}: {
    type: string;
    placeholder: string;
    register: UseFormRegisterReturn<string>;
    errors: FieldError | undefined;
    disabled?: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box width={'100%'}>
            {type === 'password' ? (
                <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder={placeholder}
                    {...register}
                    disabled={disabled}
                    sx={{
                        '& .MuiFilledInput-root': {
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            backgroundColor: '#f5f5f5',
                        },
                        '& .MuiFilledInput-input': {
                            padding: '12px',
                        },
                        width: '100%',
                    }}
                />
            ) : (
                <TextField
                    variant="filled"
                    fullWidth={true}
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    disabled={disabled}
                    sx={{
                        '& .MuiFilledInput-root': {
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            backgroundColor: '#f5f5f5',
                        },
                        '& .MuiFilledInput-input': {
                            padding: '12px',
                        },
                    }}
                />
            )}

            {errors && <p className="text-red-500 font-normal p-2">{errors.message}</p>}
        </Box>
    );
}
