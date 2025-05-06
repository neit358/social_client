export interface FormData {
    title: string;
    content: string;
}

export interface formDataChangePasswordSchema {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
