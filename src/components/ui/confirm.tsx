import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { E_Confirm } from '@/types/confirm.enum';

interface ConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    btnAgree: string;
    btnDisagree: string;
    type?: E_Confirm;
}

export default function Confirm({
    open,
    onClose,
    onConfirm,
    title,
    message,
    btnAgree,
    btnDisagree,
    type = E_Confirm.WARNING,
}: ConfirmProps) {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                {type === E_Confirm.WARNING ? (
                    <WarningAmberIcon color="warning" />
                ) : type === E_Confirm.ERROR ? (
                    <WarningAmberIcon color="error" />
                ) : type === E_Confirm.SUCCESS ? (
                    <WarningAmberIcon color="success" />
                ) : type === E_Confirm.INFO ? (
                    <WarningAmberIcon color="info" />
                ) : type === E_Confirm.QUESTION ? (
                    <WarningAmberIcon color="primary" />
                ) : (
                    <></>
                )}
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    className="text-gray-700 mt-2"
                >
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions className="px-4 pb-4">
                <Button onClick={onClose} variant="text" color="inherit">
                    {btnDisagree}
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary" autoFocus>
                    {btnAgree}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
