import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { ConfirmProps } from '@/types/confirm';

export default function Confirm({
    title,
    message,
    btnAgree,
    btnDisagree,
    open,
    onClose,
    onConfirm,
}: ConfirmProps) {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm}>{btnAgree}</Button>
                <Button onClick={onClose}>{btnDisagree}</Button>
            </DialogActions>
        </Dialog>
    );
}
