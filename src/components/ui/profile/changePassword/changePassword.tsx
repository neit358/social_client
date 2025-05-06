import { Card, CardContent, Modal } from '@mui/material';
import Input from '../../input';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '@/services/user.services';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { formDataChangePasswordSchema } from '@/types/formData';

const schema = Yup.object().shape({
    oldPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        ),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
});

export default function ChangePassword({
    open,
    setOpen,
    setOpenToast,
    setMessage,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const user = useSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formDataChangePasswordSchema>({
        resolver: yupResolver(schema),
    });

    const onsubmit = async (data: formDataChangePasswordSchema) => {
        try {
            await userService.updatePassword(user.id, data);
            setOpen(false);
            setOpenToast(true);
            setMessage('Password changed successfully!');
        } catch {
            setOpenToast(true);
            setMessage('Error changing password!');
        }
    };
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            className="flex items-center justify-center"
        >
            <Card sx={{ width: 500, borderRadius: 3, outline: 'none' }}>
                <CardContent>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
                    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="oldPassword" className="text-sm font-medium">
                                Current Password
                            </label>
                            <Input
                                placeholder="Current password"
                                register={register('oldPassword')}
                                type="password"
                                errors={errors.oldPassword}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="newPassword" className="text-sm font-medium">
                                New Password
                            </label>
                            <Input
                                placeholder="New password"
                                register={register('newPassword')}
                                type="password"
                                errors={errors.newPassword}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm New Password
                            </label>
                            <Input
                                placeholder="Confirm new password"
                                register={register('confirmPassword')}
                                type="password"
                                errors={errors.confirmPassword}
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition duration-200"
                        >
                            Change Password
                        </button>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    );
}
