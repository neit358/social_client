export interface ConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    btnAgree: string;
    btnDisagree: string;
}
