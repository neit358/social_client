import { Box, TextField } from '@mui/material';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export default function Input({
    type,
    placeholder,
    register,
    errors,
    className,
    disabled = false,
}: {
    type: string;
    placeholder: string;
    register: UseFormRegisterReturn<string>;
    errors: FieldError | undefined;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <Box width={'100%'}>
            <TextField
                variant="filled"
                fullWidth={true}
                type={type}
                placeholder={placeholder}
                {...register}
                className={className}
                disabled={disabled}
            />
            {errors && <p className="text-red-500 font-normal p-2">{errors.message}</p>}
        </Box>
    );
}
